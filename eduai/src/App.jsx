import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";

export default function Lumia() {
  const [username, setUsername] = useState(
    localStorage.getItem("lumia_username") || ""
  );

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("lumia_logged") === "true"
  );

  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("lumia_chats");

    if (savedChats) {
      return JSON.parse(savedChats);
    }

    return [
      {
        id: 1,
        title: "Nuevo chat",
        messages: [
          {
            text: "Hola 👋 Soy Lumia, el chatbot educativo de SigloXXI.",
            sender: "bot",
          },
        ],
      },
    ];
  });

  const [currentChatId, setCurrentChatId] = useState(() => {
    return (
      Number(
        localStorage.getItem(
          "lumia_current_chat"
        )
      ) || 1
    );
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "lumia_chats",
      JSON.stringify(chats)
    );
  }, [chats]);

  useEffect(() => {
    localStorage.setItem(
      "lumia_username",
      username
    );
  }, [username]);

  useEffect(() => {
    localStorage.setItem(
      "lumia_logged",
      loggedIn
    );
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem(
      "lumia_current_chat",
      currentChatId
    );
  }, [currentChatId]);

  const currentChat =
    chats.find(
      (chat) => chat.id === currentChatId
    ) || chats[0];

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "Nuevo chat",
      messages: [
        {
          text: "Hola 👋 Soy Lumia. ¿Qué deseas consultar?",
          sender: "bot",
        },
      ],
    };

    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (chatId) => {
    if (chats.length === 1) return;

    const filteredChats = chats.filter(
      (chat) => chat.id !== chatId
    );

    setChats(filteredChats);
    setCurrentChatId(filteredChats[0].id);
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    if (
      msg.includes("hola") ||
      msg.includes("buenas")
    ) {
      return "¡Hola! 😊 Soy Lumia, el chatbot educativo de SigloXXI.";
    }

    if (
      msg.includes("horario") ||
      msg.includes("entrada") ||
      msg.includes("salida")
    ) {
      return "Las clases comienzan a las 6:30am y terminan a las 12:15pm.";
    }

    if (
      msg.includes("uniforme") ||
      msg.includes("sudadera")
    ) {
      return "Los estudiantes deben portar correctamente el uniforme.";
    }

    if (
      msg.includes("planilla") ||
      msg.includes("notas")
    ) {
      return "La planilla funciona por puntos y puede revisarse desde Drive.";
    }

    if (
      msg.includes("actividad libre") ||
      msg.includes("actividades libres")
    ) {
      return "Las actividades libres ayudan a ganar puntos extra.";
    }

    if (
      msg.includes("corresponsabilidad")
    ) {
      return "La corresponsabilidad consiste en ayudar al entorno escolar.";
    }

    if (
      msg.includes("gracias")
    ) {
      return "¡Con gusto! 😄";
    }

    return "Todavía estoy aprendiendo sobre ese tema 😅";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;

    setInput("");
    setIsTyping(true);

    const updatedChats = chats.map(
      (chat) => {
        if (
          chat.id === currentChatId
        ) {
          return {
            ...chat,
            title:
              chat.title ===
              "Nuevo chat"
                ? userMessage.slice(
                    0,
                    20
                  )
                : chat.title,

            messages: [
              ...chat.messages,
              {
                text: userMessage,
                sender: "user",
              },
            ],
          };
        }

        return chat;
      }
    );

    setChats(updatedChats);

    setTimeout(() => {
      const finalChats =
        updatedChats.map((chat) => {
          if (
            chat.id === currentChatId
          ) {
            return {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  text: getBotResponse(
                    userMessage
                  ),
                  sender: "bot",
                },
              ],
            };
          }

          return chat;
        });

      setChats(finalChats);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {!loggedIn ? (
        <div
          style={{
            background:
              "linear-gradient(135deg,#141414,#1f1f1f)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            fontFamily: "Arial",
          }}
        >
          <div
            style={{
              background: "#222",
              padding: "40px",
              borderRadius: "25px",
              width: "100%",
              maxWidth: "380px",
              textAlign: "center",
              color: "white",
              boxShadow:
                "0 0 25px rgba(0,0,0,0.5)",
            }}
          >
           <img
  src={logo}
  alt="Lumia"
  style={{
    width: "120px",
    height: "120px",
    objectFit: "contain",
    marginBottom: "10px",
  }}
/>
            <h1
              style={{
                marginTop: "10px",
              }}
            >
              Lumia
            </h1>

            <p
              style={{
                color: "#aaa",
              }}
            >
              Chatbot educativo de
              SigloXXI
            </p>

            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "25px",
                borderRadius: "15px",
                border: "none",
                background: "#333",
                color: "white",
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <button
              onClick={() => {
                if (
                  username.trim()
                ) {
                  setLoggedIn(true);
                }
              }}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "15px",
                borderRadius: "15px",
                border: "none",
                background:
                  "#0b93f6",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Entrar
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection:
              window.innerWidth <
              768
                ? "column"
                : "row",

            height: "100vh",
            background:
              "#1a1a1a",
            color: "white",
            fontFamily: "Arial",
          }}
        >
          {/* SIDEBAR */}
          <div
            style={{
              width:
                window.innerWidth <
                768
                  ? "100%"
                  : "280px",

              background:
                "#111",
              borderRight:
                "1px solid #333",

              borderBottom:
                window.innerWidth <
                768
                  ? "1px solid #333"
                  : "none",

              display: "flex",
              flexDirection:
                "column",

              padding: "20px",
              boxSizing:
                "border-box",
            }}
          >
            <h2>✨ Lumia</h2>

            <button
              onClick={
                createNewChat
              }
              style={{
                background:
                  "#2a2a2a",

                color: "white",

                border: "none",

                padding: "14px",

                borderRadius:
                  "14px",

                cursor: "pointer",

                marginTop: "15px",

                marginBottom:
                  "20px",

                fontSize: "15px",
              }}
            >
              + Nuevo chat
            </button>

            <div
              style={{
                overflowY: "auto",
                flex: 1,
              }}
            >
              {chats.map(
                (chat) => (
                  <div
                    key={chat.id}
                    style={{
                      padding:
                        "12px",

                      marginBottom:
                        "10px",

                      background:
                        currentChatId ===
                        chat.id
                          ? "#333"
                          : "#222",

                      borderRadius:
                        "12px",

                      display:
                        "flex",

                      justifyContent:
                        "space-between",

                      alignItems:
                        "center",
                    }}
                  >
                    <span
                      style={{
                        cursor:
                          "pointer",
                      }}
                      onClick={() =>
                        setCurrentChatId(
                          chat.id
                        )
                      }
                    >
                      {chat.title}
                    </span>

                    <button
                      onClick={() =>
                        deleteChat(
                          chat.id
                        )
                      }
                      style={{
                        background:
                          "none",

                        border:
                          "none",

                        color:
                          "#aaa",

                        cursor:
                          "pointer",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )
              )}
            </div>

            <div
              style={{
                borderTop:
                  "1px solid #333",

                paddingTop:
                  "15px",

                marginTop:
                  "10px",
              }}
            >
              👤 {username}

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  marginTop:
                    "12px",

                  width: "100%",

                  padding:
                    "12px",

                  borderRadius:
                    "12px",

                  border:
                    "none",

                  background:
                    "#222",

                  color:
                    "white",

                  cursor:
                    "pointer",
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* CHAT */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection:
                "column",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderBottom:
                  "1px solid #333",
                fontWeight:
                  "bold",
              }}
            >
              {currentChat.title}
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding:
                  window.innerWidth <
                  768
                    ? "10px"
                    : "20px",
              }}
            >
              {currentChat.messages.map(
                (
                  msg,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      display:
                        "flex",

                      justifyContent:
                        msg.sender ===
                        "user"
                          ? "flex-end"
                          : "flex-start",

                      marginBottom:
                        "15px",
                    }}
                  >
                    <div
                      style={{
                        background:
                          msg.sender ===
                          "user"
                            ? "#0b93f6"
                            : "#333",

                        padding:
                          "14px 18px",

                        borderRadius:
                          "18px",

                        maxWidth:
                          window.innerWidth <
                          768
                            ? "90%"
                            : "65%",

                        fontSize:
                          window.innerWidth <
                          768
                            ? "14px"
                            : "16px",

                        wordBreak:
                          "break-word",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )
              )}

              {isTyping && (
                <div>
                  ✨ Lumia está
                  escribiendo...
                </div>
              )}
            </div>

            {/* BARRA */}
            <div
              style={{
                padding: "15px",
                borderTop:
                  "1px solid #333",

                display: "flex",

                gap: "10px",

                alignItems:
                  "flex-end",
              }}
            >
              <textarea
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={(
                  e
                ) => {
                  if (
                    e.key ===
                      "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius:
                    "18px",
                  border: "none",
                  background:
                    "#2a2a2a",
                  color: "white",
                  outline: "none",
                  resize: "none",
                  minHeight:
                    "55px",
                  maxHeight:
                    "150px",
                  overflowY:
                    "auto",
                  fontSize:
                    "15px",
                }}
              />

              <button
                onClick={
                  sendMessage
                }
                style={{
                  background:
                    "#0b93f6",

                  border: "none",

                  color: "white",

                  padding:
                    "15px 20px",

                  borderRadius:
                    "16px",

                  cursor:
                    "pointer",

                  fontWeight:
                    "bold",
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}