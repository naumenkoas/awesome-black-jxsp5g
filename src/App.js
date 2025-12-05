import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- НАСТРОЙКИ (Твои ключи) ---
const supabaseUrl = 'https://zcckaegtbdtxytogskhw.supabase.co';
const supabaseKey = 'sb_publishable_m2A3lu5RIvv2ER-dIt6Wmw_XC1pCB2d';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ПЕРЕВОДЫ ---
const translations = {
  ru: {
    hero_title: "Мастер на час в вашем кармане",
    hero_desc: "Быстрый поиск надежных мастеров.",
    btn_web: "Войти в систему",
    features: ["⚡ Быстрый поиск", "🛡️ Безопасная сделка", "📱 Верификация по телефону"],
    footer: "© 2024 Handyman Corp.",
    role_client: "👤 Я Клиент",
    role_master: "🛠️ Я Мастер",
    login_btn: "Войти",
    register_btn: "Зарегистрироваться",
    create_acc: "Нет аккаунта? Регистрация",
    have_acc: "Есть аккаунт? Вход",
    email_lbl: "Email",
    pass_lbl: "Пароль (минимум 6 символов)",
    phone_lbl: "Телефон для связи",
    name_lbl: "Ваше Имя",
    loading: "Загрузка...",
    new_order: "Создать заявку",
    address: "Адрес",
    task: "Что нужно сделать?",
    send: "Найти мастера",
    my_orders: "Мои заказы",
    market: "Доступные заказы",
    my_schedule: "Мой график",
    accept: "Принять заказ",
    status_new: "🔍 Поиск...",
    status_work: "🛠️ В работе",
    status_done: "✅ Выполнено",
    chat_placeholder: "Написать сообщение...",
    logout: "Выйти"
  },
  // ... (для краткости en/he оставим старыми или можно скопировать из прошлой версии) ...
  en: { hero_title: "Handyman App", hero_desc: "Find pros.", btn_web: "Login", features: [], footer: "", role_client: "Client", role_master: "Master", login_btn: "Login", register_btn: "Register", create_acc: "Register", have_acc: "Login", email_lbl: "Email", pass_lbl: "Password", phone_lbl: "Phone", name_lbl: "Name", loading: "Loading...", new_order: "New Order", address: "Address", task: "Task", send: "Send", my_orders: "My Orders", market: "Market", my_schedule: "Schedule", accept: "Accept", status_new: "Search", status_work: "Work", status_done: "Done", chat_placeholder: "Chat", logout: "Logout" },
  he: { hero_title: "אפליקציית הנדימן", hero_desc: "מצא מקצוענים.", btn_web: "כניסה", features: [], footer: "", role_client: "לקוח", role_master: "הנדימן", login_btn: "כניסה", register_btn: "הרשמה", create_acc: "הרשמה", have_acc: "כניסה", email_lbl: "אימייל", pass_lbl: "סיסמה", phone_lbl: "טלפון", name_lbl: "שם", loading: "טוען...", new_order: "הזמנה חדשה", address: "כתובת", task: "משימה", send: "שלח", my_orders: "הזמנות שלי", market: "שוק", my_schedule: "לוח שנה", accept: "קבל", status_new: "מחפש", status_work: "בעבודה", status_done: "בוצע", chat_placeholder: "צ'אט", logout: "יציאה" }
};

const getStyles = (lang) => {
  const isRTL = lang === 'he';
  return {
    container: { fontFamily: 'Arial', maxWidth: '500px', margin: '0 auto', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr', paddingBottom:'50px' },
    input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', textAlign: isRTL ? 'right' : 'left' },
    button: { width: '100%', padding: '12px', margin: '5px 0', background: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight:'bold' },
    card: { border: '1px solid #ddd', borderRadius: '12px', padding: '15px', marginBottom: '15px', background: '#fff', textAlign: isRTL ? 'right' : 'left', boxShadow:'0 2px 5px rgba(0,0,0,0.05)' },
    chatBox: { background:'#f1f1f1', borderRadius:'8px', padding:'10px', marginTop:'10px' },
    error: { color: 'red', fontSize: '12px', marginBottom: '10px' }
  };
};

export default function App() {
  const [lang, setLang] = useState('ru'); 
  const t = translations[lang]; 
  const styles = getStyles(lang);

  const [session, setSession] = useState(null); // Текущая сессия Supabase
  const [view, setView] = useState('landing'); 
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Данные приложения
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  // Форма входа/регистрации
  const [authMode, setAuthMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('client');

  // Формы заказов
  const [newOrderAddr, setNewOrderAddr] = useState('');
  const [newOrderTask, setNewOrderTask] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [tab, setTab] = useState('market');

  // --- 1. ПРОВЕРКА АВТОРИЗАЦИИ ПРИ ЗАПУСКЕ ---
  useEffect(() => {
    // Проверяем, вошел ли юзер раньше
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('app');
    });

    // Слушаем изменения (вход/выход)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setView('app');
      else setView('landing');
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- 2. ЗАГРУЗКА ДАННЫХ (ТОЛЬКО ЕСЛИ ВОШЛИ) ---
  useEffect(() => {
    if (session) {
      fetchData();
      const interval = setInterval(fetchData, 4000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchData = async () => {
    const { data: ord } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (ord) setOrders(ord);
    const { data: msg } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (msg) setMessages(msg);
  };

  // --- ЛОГИКА БЕЗОПАСНОСТИ (AUTH) ---
  
  const handleRegister = async () => {
    setLoading(true); setErrorMsg('');
    // Регистрация в Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Сохраняем доп. данные в профиль пользователя
        data: {
          full_name: fullName,
          phone: phone,
          role: role
        }
      }
    });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message); // Показать ошибку (например, пароль короткий)
    } else {
      alert("Регистрация успешна! Вы вошли.");
    }
  };

  const handleLogin = async () => {
    setLoading(true); setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });
    setLoading(false);
    if (error) setErrorMsg('Неверный Email или Пароль');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- ЛОГИКА ПРИЛОЖЕНИЯ ---

  const addOrder = async () => {
    if (!newOrderAddr) return;
    const userMeta = session.user.user_metadata;
    
    await supabase.from('orders').insert([{ 
      client_name: userMeta.full_name,
      client_id: session.user.id, // Теперь используем настоящий безопасный ID
      address: newOrderAddr, 
      task: newOrderTask + ` (Тел: ${userMeta.phone})`, // Дописываем телефон в задачу
      status: 'new' 
    }]);
    setNewOrderAddr(''); setNewOrderTask(''); fetchData();
  };

  const acceptOrder = async (orderId) => {
    await supabase.from('orders').update({ status: 'accepted', master_id: session.user.id }).eq('id', orderId);
    fetchData();
  };

  const sendMessage = async (orderId) => {
    if(!chatInput) return;
    await supabase.from('messages').insert([{ 
      order_id: orderId, 
      sender: session.user.user_metadata.full_name, // Берем имя из профиля
      text: chatInput 
    }]);
    setChatInput(''); fetchData();
  };

  // --- ИНТЕРФЕЙС ---

  // ЭКРАН 1: ЛЕНДИНГ
  if (view === 'landing') {
    return (
      <div style={styles.container}>
        <div style={{background: '#007BFF', color:'white', padding:'40px 20px', borderRadius:'0 0 20px 20px'}}>
          <h1>🛠️ Handyman Secure</h1>
          <p>{t.hero_desc}</p>
          <button style={{...styles.button, background:'white', color:'#007BFF'}} onClick={() => setView('auth')}>{t.btn_web}</button>
        </div>
      </div>
    );
  }

  // ЭКРАН 2: ВХОД / РЕГИСТРАЦИЯ
  if (view === 'auth') {
    return (
      <div style={styles.container}>
        <button onClick={()=>setView('landing')} style={{background:'none', border:'none', fontSize:'24px', float: 'left'}}>←</button>
        <h2 style={{clear:'both'}}>{authMode === 'register' ? t.register_btn : t.login_btn}</h2>
        
        {errorMsg && <div style={styles.error}>⚠️ {errorMsg}</div>}

        {/* Форма регистрации расширенная */}
        {authMode === 'register' && (
          <>
            <input style={styles.input} placeholder={t.name_lbl} value={fullName} onChange={e=>setFullName(e.target.value)} />
            <input style={styles.input} placeholder={t.phone_lbl} value={phone} onChange={e=>setPhone(e.target.value)} type="tel" />
            <select style={styles.input} value={role} onChange={e=>setRole(e.target.value)}>
              <option value="client">{t.role_client}</option>
              <option value="master">{t.role_master}</option>
            </select>
          </>
        )}

        <input style={styles.input} placeholder={t.email_lbl} value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={styles.input} placeholder={t.pass_lbl} type="password" value={password} onChange={e=>setPassword(e.target.value)} />

        <button style={styles.button} disabled={loading} onClick={authMode === 'register' ? handleRegister : handleLogin}>
          {loading ? t.loading : (authMode === 'register' ? t.register_btn : t.login_btn)}
        </button>
        
        <p style={{color:'#007BFF', cursor:'pointer'}} onClick={() => {setAuthMode(authMode==='login'?'register':'login'); setErrorMsg('')}}>
          {authMode === 'login' ? t.create_acc : t.have_acc}
        </p>
      </div>
    );
  }

  // ЭКРАН 3: ПРИЛОЖЕНИЕ (ЕСЛИ ЕСТЬ СЕССИЯ)
  if (session) {
    const userMeta = session.user.user_metadata; // Тут лежат имя, роль и телефон
    const isMaster = userMeta.role === 'master';

    return (
      <div style={styles.container}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
          <div style={{textAlign:'left'}}>
            <strong>{userMeta.full_name}</strong>
            <div style={{fontSize:'12px', color:'gray'}}>{isMaster ? t.role_master : t.role_client} | {userMeta.phone}</div>
          </div>
          <button style={{...styles.button, width:'auto', background:'#6c757d', fontSize:'12px', padding:'8px'}} onClick={handleLogout}>{t.logout}</button>
        </div>

        {/* КЛИЕНТ */}
        {!isMaster && (
          <div>
            <div style={{...styles.card, background:'#eef7ff'}}>
              <h4>{t.new_order}</h4>
              <input style={styles.input} placeholder={t.address} value={newOrderAddr} onChange={e=>setNewOrderAddr(e.target.value)} />
              <textarea style={styles.input} placeholder={t.task} value={newOrderTask} onChange={e=>setNewOrderTask(e.target.value)} />
              <button style={styles.button} onClick={addOrder}>{t.send}</button>
            </div>
            <h3>{t.my_orders}</h3>
            {orders.filter(o => o.client_id === session.user.id).map(o => (
              <div key={o.id} style={styles.card}>
                <b>{o.address}</b> - {o.status === 'new' ? t.status_new : t.status_work}
                {o.status === 'accepted' && <ChatBox order={o} msgs={messages} me={userMeta.full_name} onSend={sendMessage} styles={styles} input={chatInput} setInput={setChatInput} t={t} />}
              </div>
            ))}
          </div>
        )}

        {/* МАСТЕР */}
        {isMaster && (
          <div>
            <div style={{display:'flex', gap:'10px', margin:'15px 0'}}>
              <button style={{...styles.button, background: tab==='market'?'#007BFF':'#ccc'}} onClick={()=>setTab('market')}>{t.market}</button>
              <button style={{...styles.button, background: tab==='schedule'?'#28a745':'#ccc'}} onClick={()=>setTab('schedule')}>{t.my_schedule}</button>
            </div>
            
            {tab === 'market' ? (
              orders.filter(o => o.status === 'new').map(o => (
                <div key={o.id} style={styles.card}>
                  <div>👤 {o.client_name}</div>
                  <div>📍 {o.address}</div>
                  <div>🔨 {o.task}</div>
                  <button style={{...styles.button, background:'#28a745'}} onClick={()=>acceptOrder(o.id)}>{t.accept}</button>
                </div>
              ))
            ) : (
              orders.filter(o => o.master_id === session.user.id).map(o => (
                <div key={o.id} style={{...styles.card, borderLeft:'4px solid green'}}>
                  <h3>{o.client_name}</h3>
                  <div>📍 {o.address}</div>
                  <div>📞 {o.task}</div> 
                  <ChatBox order={o} msgs={messages} me={userMeta.full_name} onSend={sendMessage} styles={styles} input={chatInput} setInput={setChatInput} t={t} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}

// ЧАТ
const ChatBox = ({ order, msgs, me, onSend, styles, input, setInput, t }) => (
  <div style={styles.chatBox}>
    <div style={{maxHeight:'150px', overflowY:'auto'}}>
      {msgs.filter(m => m.order_id === order.id).map((m, i) => (
        <div key={i} style={{fontSize:'12px', margin:'5px 0', textAlign: m.sender===me ? 'right':'left' }}>
          <span style={{background: m.sender===me?'#dcf8c6':'#fff', padding:'5px 10px', borderRadius:'10px', border:'1px solid #ddd'}}>
            <b>{m.sender}:</b> {m.text}
          </span>
        </div>
      ))}
    </div>
    <div style={{display:'flex', marginTop:'5px'}}>
      <input style={{...styles.input, marginBottom:0}} value={input} onChange={e=>setInput(e.target.value)} placeholder={t.chat_placeholder} />
      <button style={{...styles.button, width:'50px', margin:0}} onClick={()=>onSend(order.id)}>➤</button>
    </div>
  </div>
);
