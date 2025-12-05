import React, { useState } from "react";

// --- ПЕРЕВОДЫ (ТЕКСТЫ) ---
const translations = {
  ru: {
    hero_title: "Мастер на час в вашем кармане",
    hero_desc:
      "Быстрый поиск надежных мастеров. Сантехника, электрика, ремонт — мы поможем!",
    btn_download: "Скачать приложение",
    btn_web: "Войти через Браузер",
    features: ["⚡ Быстрый поиск", "🛡️ Гарантия качества", "💬 Чат с мастером"],
    footer: "© 2024 Handyman Corp.",
    // ...старые переводы...
    role_client: "👤 Клиент",
    role_master: "🛠️ Мастер",
    login: "Войти",
    register: "Регистрация",
    create_acc: "Нет аккаунта?",
    have_acc: "Уже есть аккаунт?",
    new_order: "Новый заказ",
    address: "Адрес",
    task: "Что случилось?",
    date: "Когда прийти?",
    send: "Найти мастера",
    my_orders: "Мои заказы",
    market: "Биржа заказов",
    my_schedule: "Мой график",
    accept: "Взять заказ",
    reject: "Скрыть",
    status_new: "🔍 Поиск...",
    status_work: "🛠️ Мастер едет",
    chat_placeholder: "Сообщение...",
    no_orders: "Заказов нет",
    logout: "Выйти",
  },
  en: {
    hero_title: "Handyman in your pocket",
    hero_desc:
      "Fast search for reliable pros. Plumbing, electrical, repair — we help!",
    btn_download: "Download App",
    btn_web: "Use Web Version",
    features: ["⚡ Fast Search", "🛡️ Quality Assurance", "💬 In-app Chat"],
    footer: "© 2024 Handyman Corp.",
    // ...old translations...
    role_client: "👤 Client",
    role_master: "🛠️ Handyman",
    login: "Login",
    register: "Register",
    create_acc: "No account?",
    have_acc: "Have an account?",
    new_order: "New Order",
    address: "Address",
    task: "Task",
    date: "Date",
    send: "Find Pro",
    my_orders: "My Orders",
    market: "Jobs Market",
    my_schedule: "Schedule",
    accept: "Accept",
    reject: "Hide",
    status_new: "🔍 Searching...",
    status_work: "🛠️ On the way",
    chat_placeholder: "Message...",
    no_orders: "No orders",
    logout: "Logout",
  },
  he: {
    hero_title: "הנדימן בכיס שלך",
    hero_desc:
      "חיפוש מהיר של מקצוענים אמינים. אינסטלציה, חשמל, תיקונים - אנחנו כאן!",
    btn_download: "הורד את האפליקציה",
    btn_web: "כנס דרך הדפדפן",
    features: ["⚡ חיפוש מהיר", "🛡️ אחריות איכות", "💬 צ'אט באפליקציה"],
    footer: "© 2024 Handyman Corp.",
    // ...old translations...
    role_client: "👤 לקוח",
    role_master: "🛠️ הנדימן",
    login: "כניסה",
    register: "הרשמה",
    create_acc: "אין חשבון?",
    have_acc: "יש לך חשבון?",
    new_order: "הזמנה חדשה",
    address: "כתובת",
    task: "תיאור תקלה",
    date: "תאריך ושעה",
    send: "שלח",
    my_orders: "ההזמנות שלי",
    market: "לוח עבודות",
    my_schedule: "היומן שלי",
    accept: "קבל",
    reject: "דחה",
    status_new: "🔍 מחפש...",
    status_work: "🛠️ בדרך",
    chat_placeholder: "הודעה...",
    no_orders: "אין הזמנות",
    logout: "יציאה",
  },
};

// --- СТИЛИ ---
const getStyles = (lang) => {
  const isRTL = lang === "he";
  return {
    container: {
      fontFamily: "Arial",
      maxWidth: "500px",
      margin: "0 auto",
      textAlign: "center",
      direction: isRTL ? "rtl" : "ltr",
      paddingBottom: "50px",
    },
    landingHero: {
      background: "linear-gradient(135deg, #007BFF, #00c6ff)",
      color: "white",
      padding: "40px 20px",
      borderRadius: "0 0 20px 20px",
      marginBottom: "20px",
    },
    btnMain: {
      width: "100%",
      padding: "15px",
      margin: "10px 0",
      background: "white",
      color: "#007BFF",
      border: "none",
      borderRadius: "30px",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    btnSec: {
      width: "100%",
      padding: "15px",
      margin: "5px 0",
      background: "transparent",
      color: "white",
      border: "2px solid white",
      borderRadius: "30px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    feature: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      textAlign: isRTL ? "right" : "left",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      textAlign: isRTL ? "right" : "left",
    },
    button: {
      width: "100%",
      padding: "12px",
      margin: "5px 0",
      background: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "15px",
      marginBottom: "15px",
      background: "#fff",
      textAlign: isRTL ? "right" : "left",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    },
    chatBox: {
      background: "#f1f1f1",
      borderRadius: "8px",
      padding: "10px",
      marginTop: "10px",
    },
    langBtn: {
      margin: "0 5px",
      cursor: "pointer",
      background: "none",
      border: "none",
      fontSize: "20px",
    },
  };
};

export default function App() {
  const [lang, setLang] = useState("ru");
  const t = translations[lang];
  const styles = getStyles(lang);

  // Режим: 'landing' (сайт) или 'app' (приложение)
  const [view, setView] = useState("landing");

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  // Поля форм
  const [authMode, setAuthMode] = useState("login");
  const [formName, setFormName] = useState("");
  const [formPass, setFormPass] = useState("");
  const [formRole, setFormRole] = useState("client");
  const [newOrderAddr, setNewOrderAddr] = useState("");
  const [newOrderTask, setNewOrderTask] = useState("");
  const [newOrderDate, setNewOrderDate] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [tab, setTab] = useState("market");

  // --- ЛОГИКА ---
  const handleRegister = () => {
    if (!formName || !formPass) return alert("Error");
    const newUser = {
      id: Date.now(),
      username: formName,
      password: formPass,
      role: formRole,
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === formName && u.password === formPass
    );
    if (user) setCurrentUser(user);
    else alert("Error login");
  };

  const addOrder = () => {
    const order = {
      id: Date.now(),
      clientId: currentUser.id,
      clientName: currentUser.username,
      address: newOrderAddr,
      task: newOrderTask,
      date: newOrderDate,
      status: "new",
      masterId: null,
    };
    setOrders([...orders, order]);
    setNewOrderAddr("");
    setNewOrderTask("");
    setNewOrderDate("");
    alert(t.status_new);
  };

  const acceptOrder = (orderId) =>
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? { ...o, status: "accepted", masterId: currentUser.id }
          : o
      )
    );

  const sendMessage = (orderId) => {
    if (!chatInput) return;
    setMessages([
      ...messages,
      { orderId, sender: currentUser.username, text: chatInput },
    ]);
    setChatInput("");
  };

  const logout = () => {
    setCurrentUser(null);
    setView("landing");
  };

  // 1. ВЫБОР ЯЗЫКА
  const LangSelector = () => (
    <div style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
      <button style={styles.langBtn} onClick={() => setLang("en")}>
        🇺🇸
      </button>
      <button style={styles.langBtn} onClick={() => setLang("ru")}>
        🇷🇺
      </button>
      <button style={styles.langBtn} onClick={() => setLang("he")}>
        🇮🇱
      </button>
    </div>
  );

  // 2. ЛЕНДИНГ (Сайт-визитка)
  if (view === "landing") {
    return (
      <div style={{ ...styles.container, padding: 0 }}>
        <div style={styles.landingHero}>
          <LangSelector />
          <h1 style={{ margin: "0 0 10px 0" }}>🛠️ Handyman</h1>
          <h2 style={{ fontSize: "18px", fontWeight: "normal" }}>
            {t.hero_title}
          </h2>
          <p style={{ opacity: 0.9 }}>{t.hero_desc}</p>

          <button
            style={styles.btnMain}
            onClick={() => alert("Переход в AppStore...")}
          >
            🍏 App Store
          </button>
          <button
            style={styles.btnMain}
            onClick={() => alert("Переход в Google Play...")}
          >
            🤖 Google Play
          </button>
          <button style={styles.btnSec} onClick={() => setView("app")}>
            {t.btn_web}
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          {t.features.map((feat, i) => (
            <div key={i} style={styles.feature}>
              ✅ {feat}
            </div>
          ))}
        </div>
        <p style={{ color: "#999", fontSize: "12px" }}>{t.footer}</p>
      </div>
    );
  }

  // 3. ПРИЛОЖЕНИЕ (ВХОД)
  if (!currentUser) {
    return (
      <div style={styles.container}>
        <button
          onClick={() => setView("landing")}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            float: styles.container.direction === "rtl" ? "right" : "left",
          }}
        >
          ←
        </button>
        <LangSelector />
        <h2 style={{ marginTop: "0" }}>
          {authMode === "register" ? t.register : t.login}
        </h2>
        <input
          style={styles.input}
          placeholder="Login"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Pass"
          value={formPass}
          onChange={(e) => setFormPass(e.target.value)}
        />
        {authMode === "register" && (
          <select
            style={styles.input}
            value={formRole}
            onChange={(e) => setFormRole(e.target.value)}
          >
            <option value="client">{t.role_client}</option>
            <option value="master">{t.role_master}</option>
          </select>
        )}
        <button
          style={styles.button}
          onClick={authMode === "register" ? handleRegister : handleLogin}
        >
          {authMode === "register" ? t.register : t.login}
        </button>
        <p
          style={{ color: "#007BFF", cursor: "pointer" }}
          onClick={() =>
            setAuthMode(authMode === "login" ? "register" : "login")
          }
        >
          {authMode === "login" ? t.create_acc : t.have_acc}
        </p>
      </div>
    );
  }

  // 4. ПРИЛОЖЕНИЕ (ВНУТРИ)
  const isMaster = currentUser.role === "master";

  return (
    <div style={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "10px",
          borderBottom: "1px solid #eee",
        }}
      >
        <strong>
          {currentUser.username} ({isMaster ? t.role_master : t.role_client})
        </strong>
        <button
          style={{
            ...styles.button,
            width: "auto",
            padding: "5px 10px",
            background: "#999",
          }}
          onClick={logout}
        >
          {t.logout}
        </button>
      </div>

      {!isMaster ? (
        // --- КЛИЕНТ ---
        <div>
          <div style={{ ...styles.card, background: "#eef7ff" }}>
            <h4>{t.new_order}</h4>
            <input
              style={styles.input}
              placeholder={t.address}
              value={newOrderAddr}
              onChange={(e) => setNewOrderAddr(e.target.value)}
            />
            <input
              style={styles.input}
              placeholder={t.task}
              value={newOrderTask}
              onChange={(e) => setNewOrderTask(e.target.value)}
            />
            <input
              style={styles.input}
              type="datetime-local"
              value={newOrderDate}
              onChange={(e) => setNewOrderDate(e.target.value)}
            />
            <button style={styles.button} onClick={addOrder}>
              {t.send}
            </button>
          </div>
          <h3>{t.my_orders}</h3>
          {orders
            .filter((o) => o.clientId === currentUser.id)
            .map((o) => (
              <div key={o.id} style={styles.card}>
                <b>{o.address}</b> -{" "}
                {o.status === "new" ? t.status_new : t.status_work}
                {o.status === "accepted" && (
                  <ChatBox
                    order={o}
                    msgs={messages}
                    me={currentUser.username}
                    onSend={sendMessage}
                    t={t}
                    styles={styles}
                    input={chatInput}
                    setInput={setChatInput}
                  />
                )}
              </div>
            ))}
        </div>
      ) : (
        // --- МАСТЕР ---
        <div>
          <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            <button
              style={{
                ...styles.button,
                background: tab === "market" ? "#007BFF" : "#ccc",
              }}
              onClick={() => setTab("market")}
            >
              {t.market}
            </button>
            <button
              style={{
                ...styles.button,
                background: tab === "schedule" ? "#28a745" : "#ccc",
              }}
              onClick={() => setTab("schedule")}
            >
              {t.my_schedule}
            </button>
          </div>
          {tab === "market"
            ? orders
                .filter((o) => o.status === "new")
                .map((o) => (
                  <div key={o.id} style={styles.card}>
                    <div>📍 {o.address}</div>
                    <div>🔨 {o.task}</div>
                    <button
                      style={{ ...styles.button, background: "#28a745" }}
                      onClick={() => acceptOrder(o.id)}
                    >
                      {t.accept}
                    </button>
                  </div>
                ))
            : orders
                .filter((o) => o.masterId === currentUser.id)
                .map((o) => (
                  <div
                    key={o.id}
                    style={{ ...styles.card, borderLeft: "4px solid green" }}
                  >
                    <h3>{o.clientName}</h3>
                    <div>📍 {o.address}</div>
                    <ChatBox
                      order={o}
                      msgs={messages}
                      me={currentUser.username}
                      onSend={sendMessage}
                      t={t}
                      styles={styles}
                      input={chatInput}
                      setInput={setChatInput}
                    />
                  </div>
                ))}
        </div>
      )}
    </div>
  );
}

// Мини-компонент Чата
const ChatBox = ({ order, msgs, me, onSend, t, styles, input, setInput }) => (
  <div style={styles.chatBox}>
    {msgs
      .filter((m) => m.orderId === order.id)
      .map((m, i) => (
        <div
          key={i}
          style={{
            fontSize: "12px",
            textAlign:
              m.sender === me
                ? styles.container.direction === "rtl"
                  ? "left"
                  : "right"
                : styles.container.direction === "rtl"
                ? "right"
                : "left",
          }}
        >
          <span
            style={{
              background: m.sender === me ? "#dcf8c6" : "#fff",
              padding: "3px 8px",
              borderRadius: "5px",
            }}
          >
            {m.text}
          </span>
        </div>
      ))}
    <div style={{ display: "flex", marginTop: "5px" }}>
      <input
        style={{ ...styles.input, marginBottom: 0 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat_placeholder}
      />
      <button
        style={{ ...styles.button, width: "50px", margin: 0 }}
        onClick={() => onSend(order.id)}
      >
        ➤
      </button>
    </div>
  </div>
);
