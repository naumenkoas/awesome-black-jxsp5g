import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- НАСТРОЙКА SUPABASE (Твои ключи) ---
const supabaseUrl = 'https://zcckaegtbdtxytogskhw.supabase.co';
const supabaseKey = 'sb_publishable_m2A3lu5RIvv2ER-dIt6Wmw_XC1pCB2d';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- ПЕРЕВОДЫ ---
const translations = {
  ru: {
    hero_title: "Мастер на час в вашем кармане",
    hero_desc: "Быстрый поиск надежных мастеров. Сантехника, электрика, ремонт — мы поможем!",
    btn_web: "Войти через Браузер",
    features: ["⚡ Быстрый поиск", "🛡️ Гарантия качества", "💬 Чат с мастером"],
    footer: "© 2024 Handyman Corp.",
    role_client: "👤 Клиент",
    role_master: "🛠️ Мастер",
    login: "Войти",
    register: "Регистрация",
    create_acc: "Нет аккаунта?",
    have_acc: "Уже есть аккаунт?",
    new_order: "Новый заказ",
    address: "Адрес",
    task: "Что случилось?",
    send: "Найти мастера",
    my_orders: "Мои заказы",
    market: "Биржа заказов",
    my_schedule: "Мой график",
    accept: "Взять заказ",
    status_new: "🔍 Поиск...",
    status_work: "🛠️ Мастер едет",
    chat_placeholder: "Сообщение...",
    no_orders: "Заказов нет",
    logout: "Выйти"
  },
  en: {
    hero_title: "Handyman in your pocket",
    hero_desc: "Fast search for reliable pros.",
    btn_web: "Use Web Version",
    features: ["⚡ Fast Search", "🛡️ Quality", "💬 Chat"],
    footer: "© 2024 Handyman Corp.",
    role_client: "👤 Client",
    role_master: "🛠️ Handyman",
    login: "Login",
    register: "Register",
    create_acc: "No account?",
    have_acc: "Have an account?",
    new_order: "New Order",
    address: "Address",
    task: "Task",
    send: "Find Pro",
    my_orders: "My Orders",
    market: "Jobs Market",
    my_schedule: "Schedule",
    accept: "Accept",
    status_new: "🔍 Searching...",
    status_work: "🛠️ On the way",
    chat_placeholder: "Message...",
    no_orders: "No orders",
    logout: "Logout"
  },
  he: {
    hero_title: "הנדימן בכיס שלך",
    hero_desc: "חיפוש מהיר של מקצוענים אמינים.",
    btn_web: "כנס דרך הדפדפן",
    features: ["⚡ חיפוש מהיר", "🛡️ איכות", "💬 צ'אט"],
    footer: "© 2024 Handyman Corp.",
    role_client: "👤 לקוח",
    role_master: "🛠️ הנדימן",
    login: "כניסה",
    register: "הרשמה",
    create_acc: "אין חשבון?",
    have_acc: "יש לך חשבון?",
    new_order: "הזמנה חדשה",
    address: "כתובת",
    task: "תיאור תקלה",
    send: "שלח",
    my_orders: "ההזמנות שלי",
    market: "לוח עבודות",
    my_schedule: "היומן שלי",
    accept: "קבל",
    status_new: "🔍 מחפש...",
    status_work: "🛠️ בדרך",
    chat_placeholder: "הודעה...",
    no_orders: "אין הזמנות",
    logout: "יציאה"
  }
};

const getStyles = (lang) => {
  const isRTL = lang === 'he';
  return {
    container: { fontFamily: 'Arial', maxWidth: '500px', margin: '0 auto', textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr', paddingBottom:'50px' },
    landingHero: { background: 'linear-gradient(135deg, #007BFF, #00c6ff)', color: 'white', padding: '40px 20px', borderRadius: '0 0 20px 20px', marginBottom:'20px' },
    btnMain: { width: '100%', padding: '15px', margin: '10px 0', background: 'white', color: '#007BFF', border: 'none', borderRadius: '30px', fontWeight:'bold', fontSize:'16px', cursor:'pointer' },
    btnSec: { width: '100%', padding: '15px', margin: '5px 0', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '30px', fontWeight:'bold', cursor:'pointer' },
    input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box', textAlign: isRTL ? 'right' : 'left' },
    button: { width: '100%', padding: '12px', margin: '5px 0', background: '#007BFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight:'bold' },
    card: { border: '1px solid #ddd', borderRadius: '12px', padding: '15px', marginBottom: '15px', background: '#fff', textAlign: isRTL ? 'right' : 'left', boxShadow:'0 2px 5px rgba(0,0,0,0.05)' },
    chatBox: { background:'#f1f1f1', borderRadius:'8px', padding:'10px', marginTop:'10px' },
    langBtn: { margin: '0 5px', cursor: 'pointer', background: 'none', border: 'none', fontSize:'20px' }
  };
};

export default function App() {
  const [lang, setLang] = useState('ru'); 
  const t = translations[lang]; 
  const styles = getStyles(lang);

  const [view, setView] = useState('landing'); 
  const [currentUser, setCurrentUser] = useState(null);
  
  // Данные из Supabase
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  // Поля форм
  const [authMode, setAuthMode] = useState('login'); 
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('client');
  const [newOrderAddr, setNewOrderAddr] = useState('');
  const [newOrderTask, setNewOrderTask] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [tab, setTab] = useState('market');

  // --- ЗАГРУЗКА ДАННЫХ ---
  useEffect(() => {
    fetchData();
    // Обновляем данные каждые 5 секунд (простая версия реального времени)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    // Скачиваем заказы
    const { data: ordersData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (ordersData) setOrders(ordersData);

    // Скачиваем сообщения
    const { data: msgData } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
    if (msgData) setMessages(msgData);
  };

  // --- ЛОГИКА ---
  const handleAuth = () => {
    if(!formName) return alert('Введите имя');
    // Упрощенная авторизация без пароля для теста
    const user = { username: formName, role: formRole };
    setCurrentUser(user);
    // Сохраняем пользователя в локальной памяти браузера, чтобы не входить каждый раз
    localStorage.setItem('handyman_user', JSON.stringify(user));
  };

  const addOrder = async () => {
    if (!newOrderAddr) return alert('Адрес нужен!');
    const newOrder = { 
      client_name: currentUser.username, 
      client_id: currentUser.username, 
      address: newOrderAddr, 
      task: newOrderTask, 
      status: 'new' 
    };
    await supabase.from('orders').insert([newOrder]);
    setNewOrderAddr(''); setNewOrderTask('');
    fetchData(); // Обновить список сразу
    alert(t.status_new);
  };

  const acceptOrder = async (orderId) => {
    await supabase.from('orders').update({ status: 'accepted', master_id: currentUser.username }).eq('id', orderId);
    fetchData();
  };
  
  const sendMessage = async (orderId) => {
    if(!chatInput) return;
    await supabase.from('messages').insert([{ order_id: orderId, sender: currentUser.username, text: chatInput }]);
    setChatInput('');
    fetchData();
  };

  const logout = () => { setCurrentUser(null); setView('landing'); };

  // --- ОТРИСОВКА ---
  const LangSelector = () => (
    <div style={{padding:'10px', display:'flex', justifyContent:'center'}}>
      <button style={styles.langBtn} onClick={()=>setLang('en')}>🇺🇸</button>
      <button style={styles.langBtn} onClick={()=>setLang('ru')}>🇷🇺</button>
      <button style={styles.langBtn} onClick={()=>setLang('he')}>🇮🇱</button>
    </div>
  );

  // 1. ЛЕНДИНГ
  if (view === 'landing') {
    return (
      <div style={{...styles.container, padding:0}}>
        <div style={styles.landingHero}>
          <LangSelector />
          <h1>🛠️ Handyman</h1>
          <p>{t.hero_desc}</p>
          <button style={styles.btnSec} onClick={() => setView('app')}>{t.btn_web}</button>
        </div>
        <div style={{padding:'20px'}}>
          {t.features.map((feat, i) => <div key={i} style={{padding:'10px', borderBottom:'1px solid #eee'}}>✅ {feat}</div>)}
        </div>
        <p style={{color:'#999', fontSize:'12px'}}>{t.footer}</p>
      </div>
    );
  }

  // 2. ВХОД
  if (!currentUser) {
    return (
      <div style={styles.container}>
        <button onClick={()=>setView('landing')} style={{background:'none', border:'none', fontSize:'24px', float: 'left'}}>←</button>
        <LangSelector />
        <h2>{authMode === 'register' ? t.register : t.login}</h2>
        <input style={styles.input} placeholder="Имя (Login)" value={formName} onChange={e=>setFormName(e.target.value)} />
        
        {authMode === 'register' && (
          <select style={styles.input} value={formRole} onChange={e=>setFormRole(e.target.value)}>
            <option value="client">{t.role_client}</option>
            <option value="master">{t.role_master}</option>
          </select>
        )}
        <button style={styles.button} onClick={handleAuth}>{t.login} / {t.register}</button>
        
        <p style={{color:'#007BFF', cursor:'pointer'}} onClick={() => setAuthMode(authMode==='login'?'register':'login')}>
          {authMode === 'login' ? t.create_acc : t.have_acc}
        </p>
      </div>
    );
  }

  // 3. ПРИЛОЖЕНИЕ
  const isMaster = currentUser.role === 'master';
  
  return (
    <div style={styles.container}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:'10px', borderBottom:'1px solid #eee'}}>
        <strong>{currentUser.username} ({isMaster ? t.role_master : t.role_client})</strong>
        <button style={{...styles.button, width:'auto', padding:'5px 10px', background:'#999'}} onClick={logout}>{t.logout}</button>
      </div>
      
      {!isMaster ? (
        // КЛИЕНТ
        <div>
          <div style={{...styles.card, background:'#eef7ff'}}>
            <h4>{t.new_order}</h4>
            <input style={styles.input} placeholder={t.address} value={newOrderAddr} onChange={e=>setNewOrderAddr(e.target.value)} />
            <input style={styles.input} placeholder={t.task} value={newOrderTask} onChange={e=>setNewOrderTask(e.target.value)} />
            <button style={styles.button} onClick={addOrder}>{t.send}</button>
          </div>
          <h3>{t.my_orders}</h3>
          {orders.filter(o => o.client_id === currentUser.username).map(o => (
            <div key={o.id} style={styles.card}>
              <b>{o.address}</b> - <span style={{color: o.status==='accepted'?'green':'orange'}}>{o.status === 'new' ? t.status_new : t.status_work}</span>
              {o.status === 'accepted' && <ChatBox order={o} msgs={messages} me={currentUser.username} onSend={sendMessage} t={t} styles={styles} input={chatInput} setInput={setChatInput} />}
            </div>
          ))}
        </div>
      ) : (
        // МАСТЕР
        <div>
          <div style={{display:'flex', gap:'10px', margin:'15px 0'}}>
            <button style={{...styles.button, background: tab==='market'?'#007BFF':'#ccc'}} onClick={()=>setTab('market')}>{t.market}</button>
            <button style={{...styles.button, background: tab==='schedule'?'#28a745':'#ccc'}} onClick={()=>setTab('schedule')}>{t.my_schedule}</button>
          </div>
          {tab === 'market' ? (
             orders.filter(o => o.status === 'new').map(o => (
               <div key={o.id} style={styles.card}>
                 <div>📍 {o.address}</div>
                 <div>🔨 {o.task}</div>
                 <button style={{...styles.button, background:'#28a745'}} onClick={()=>acceptOrder(o.id)}>{t.accept}</button>
               </div>
             ))
          ) : (
             orders.filter(o => o.master_id === currentUser.username).map(o => (
               <div key={o.id} style={{...styles.card, borderLeft:'4px solid green'}}>
                 <h3>{o.client_name}</h3>
                 <div>📍 {o.address}</div>
                 <ChatBox order={o} msgs={messages} me={currentUser.username} onSend={sendMessage} t={t} styles={styles} input={chatInput} setInput={setChatInput} />
               </div>
             ))
          )}
        </div>
      )}
    </div>
  );
}

const ChatBox = ({ order, msgs, me, onSend, t, styles, input, setInput }) => (
  <div style={styles.chatBox}>
    <div style={{maxHeight:'150px', overflowY:'auto'}}>
      {msgs.filter(m => m.order_id === order.id).map((m, i) => (
        <div key={i} style={{fontSize:'12px', textAlign: m.sender===me ? (styles.container.direction==='rtl'?'left':'right') : (styles.container.direction==='rtl'?'right':'left') }}>
          <span style={{background: m.sender===me?'#dcf8c6':'#fff', padding:'3px 8px', borderRadius:'5px'}}>
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
