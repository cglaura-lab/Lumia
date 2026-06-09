import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import logo from "./assets/logo.png";

export default function Lumia() {
  const GOLD = "#f5c542";
  const BG = "#0f0f0f";
  const CARD = "#181818";
  const SIDEBAR = "#121212";

  const messagesEndRef =
    useRef(null);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  const [isMobile,
    setIsMobile] =
    useState(
      window.innerWidth < 768
    );

  const [sidebarOpen,
    setSidebarOpen] =
    useState(
      window.innerWidth >= 768
    );

  const [username,
    setUsername] =
    useState(
      localStorage.getItem(
        "lumia_username"
      ) || ""
    );

  const [loggedIn,
    setLoggedIn] =
    useState(
      localStorage.getItem(
        "lumia_logged"
      ) === "true"
    );

  const [input,
    setInput] =
    useState("");
    const [searchChat, setSearchChat] =
  useState("");

  const [isTyping,
    setIsTyping] =
    useState(false);

  const [chats,
    setChats] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "lumia_chats"
        );

      if (saved) {
        return JSON.parse(saved);
      }

      return [
        {
          id: 1,
          title: "Bienvenida",

          messages: [
            {
              text:
                "💡 Hola, soy Lumia, la luciérnaga guía de la Institución Educativa Siglo XXI.",

              sender: "bot",

              time:
                getCurrentTime(),
            },
          ],
        },
      ];
    });

  const [currentChatId,
    setCurrentChatId] =
    useState(() => {
      return (
        Number(
          localStorage.getItem(
            "lumia_current_chat"
          )
        ) || 1
      );
    });

  useEffect(() => {
    const handleResize =
      () => {
        const mobile =
          window.innerWidth <
          768;

        setIsMobile(
          mobile
        );

        if (!mobile) {
          setSidebarOpen(
            true
          );
        }
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

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

  useEffect(() => {
    messagesEndRef.current
      ?.scrollIntoView({
        behavior:
          "smooth",
      });
  }, [chats, isTyping]);

  const currentChat =
    chats.find(
      (chat) =>
        chat.id ===
        currentChatId
    ) || chats[0];
    const filteredChats =
  chats.filter((chat) =>
    chat.title
      .toLowerCase()
      .includes(
        searchChat.toLowerCase()
      )
  );

  const createNewChat =
    () => {
      const newChat = {
        id: Date.now(),

        title:
          "Nuevo chat",

        messages: [
          {
            text:
              "💡 Hola, soy Lumia. ¿Cómo puedo ayudarte hoy?",

            sender:
              "bot",

            time:
              getCurrentTime(),
          },
        ],
      };

      setChats([
        newChat,
        ...chats,
      ]);

      setCurrentChatId(
        newChat.id
      );

      if (isMobile) {
        setSidebarOpen(
          false
        );
      }
    };

  const deleteChat =
    (chatId) => {
      if (
        chats.length === 1
      ) {
        return;
      }

      const filteredChats =
        chats.filter(
          (chat) =>
            chat.id !==
            chatId
        );

      setChats(
        filteredChats
      );

      setCurrentChatId(
        filteredChats[0].id
      );
    };

  const getBotResponse =
    (message) => {
      const msg =
        message.toLowerCase();

      const responses = [
        {
          keywords: [
            "hola",
            "buenas",
          ],

          response: `¡Hola! 👋

Soy Lumia, la luciérnaga guía de la Institución Educativa Siglo XXI.

Puedo ayudarte con:

• Horarios
• Uniformes
• Planillas
• Actividades libres
• Corresponsabilidad
• Asistencia
• Pruebas del libro
• Eventos institucionales
• Google Classroom

¿Qué deseas consultar?`,
        },

        {
          keywords: [
            "horario",
            "entrada",
            "salida",
          ],

          response: `⏰ HORARIO INSTITUCIONAL

Inicio de clases:
6:30 a.m.

Lunes a jueves:
• Descanso de 10:10 a.m. a 10:30 a.m.

Viernes:
• Descanso de 9:00 a.m. a 10:00 a.m.

Almuerzo:
12:15 p.m. a 1:40 p.m.

Salida:
1:40 p.m.`,
        },

        {
          keywords: [
            "uniforme",
          ],

          response: `👕 UNIFORME INSTITUCIONAL

Niñas:
• Camisa por dentro.
• Falda a la altura de la rodilla.
• Medias institucionales.
• Zapatos institucionales.

Niños:
• Camisa por dentro.
• Pantalón no entubado.
• Medias media caña.

Educación Física:

• Sudadera no entubada.
• Camiseta por dentro.
• Medias blancas media caña.

El incumplimiento puede afectar los puntos de imagen.`,
        },

        {
          keywords: [
            "planilla",
            "notas",
          ],

          response: `📋 PLANILLA DE PUNTOS

La planilla permite hacer seguimiento al desempeño estudiantil.

Se evalúan:

• Asistencia
• Imagen
• Participación
• Ejercitación
• Evaluaciones

Los padres pueden revisarla mediante Drive cuando esté disponible.`,
        },

        {
          keywords: [
            "actividad libre",
            "actividades libres",
          ],

          response: `⭐ ACTIVIDADES LIBRES

• Son voluntarias.
• Otorgan 50 puntos.
• Ayudan a subir de nivel.
• Fortalecen el aprendizaje.

Deben entregarse dentro de las fechas establecidas.`,
        },

        {
          keywords: [
            "corresponsabilidad",
          ],

          response: `🤝 CORRESPONSABILIDAD

Busca mejorar el entorno escolar.

Ejemplos:

• Aseo
• Embellecimiento
• Organización
• Donación de materiales

Cada $1.000 equivale aproximadamente a 1 punto cuando se trata de productos.`,
        },

        {
          keywords: [
            "asistencia",
          ],

          response: `✅ ASISTENCIA

Valor: 5 puntos.

Si un estudiante falta:

• Debe presentar excusa.
• Debe ponerse al día.

Las llegadas tarde frecuentes pueden afectar la valoración.`,
        },

        {
          keywords: [
            "prueba",
            "libro",
          ],

          requireAll: true,

          response: `📚 PRUEBA DEL LIBRO

Características:

• Tipo ICFES
• 20 preguntas
• 5 puntos por pregunta
• Máximo 100 puntos

Duración:

• Mínimo 40 minutos
• Máximo 80 minutos

Resultados:

⭐ 80 puntos o más:
Recibe 3 actividades libres.

⚠️ 25 puntos o menos:
Pierde 15 puntos en:

• Español
• Lectura Crítica
• Sociales`,
        },

        {
          keywords: [
            "classroom",
            "google classroom",
          ],

          response: `💻 GOOGLE CLASSROOM

Puedes ingresar desde:

https://classroom.google.com/

Allí encontrarás actividades, tareas y recursos compartidos por los docentes.`,
        },

{
  keywords: [
    "evento",
    "eventos",
    "calendario",
  ],

  response: `📅 EVENTOS INSTITUCIONALES

• Día del Idioma - Concurso de Oratoria:
23 de abril.

• XVII Foro Institucional y Premio a los Mejores Docentes:
21 de mayo.

• Día del Educador:
22 de mayo.

• Día de la Ciencia:
17 de junio.

• Olimpiadas de Digitación y de las Matemáticas:
18 de junio.

• Día del Estudiante:
18 de junio.

• Día de la Familia:
19 de junio.

• Festival de la Cultura y el Deporte:
Del 3 al 6 de noviembre.

`,
},

        {
          keywords: [
            "siglo xxi",
            "institución",
          ],

          response: `🏫 INSTITUCIÓN EDUCATIVA SIGLO XXI

Lumia fue creada para orientar a estudiantes, docentes y familias sobre información institucional, normas, actividades y procesos académicos.`,
        },

        {
          keywords: [
            "gracias",
          ],

          response: ` Con gusto.

Estoy aquí para ayudarte cuando lo necesites.`,
        },
      ];

      for (const item of responses) {
        if (
          item.requireAll
        ) {
          const matchesAll =
            item.keywords.every(
              (word) =>
                msg.includes(
                  word
                )
            );

          if (
            matchesAll
          ) {
            return item.response;
          }
        } else {
          const matches =
            item.keywords.some(
              (word) =>
                msg.includes(
                  word
                )
            );

          if (
            matches
          ) {
            return item.response;
          }
        }
      }

      return `🌟 Aún no tengo información suficiente sobre ese tema.

Puedes preguntarme acerca de:

• Horarios
• Uniformes
• Planillas
• Actividades libres
• Corresponsabilidad
• Asistencia
• Pruebas del libro
• Eventos institucionales
• Google Classroom`;
    };

  const sendMessage =
    () => {
      if (
        !input.trim()
      )
        return;

      const userMessage =
        input.trim();

      setInput("");
      setIsTyping(true);

      const updatedChats =
        chats.map(
          (chat) => {
            if (
              chat.id ===
              currentChatId
            ) {
              return {
                ...chat,

                title:
                  chat.title ===
                  "Nuevo chat"
                    ? userMessage.slice(
                        0,
                        25
                      )
                    : chat.title,

                messages: [
                  ...chat.messages,

                  {
                    text:
                      userMessage,

                    sender:
                      "user",

                    time:
                      getCurrentTime(),
                  },
                ],
              };
            }

            return chat;
          }
        );

      setChats(
        updatedChats
      );

      setTimeout(
        () => {
          const finalChats =
            updatedChats.map(
              (chat) => {
                if (
                  chat.id ===
                  currentChatId
                ) {
                  return {
                    ...chat,

                    messages: [
                      ...chat.messages,

                      {
                        text:
                          getBotResponse(
                            userMessage
                          ),

                        sender:
                          "bot",

                        time:
                          getCurrentTime(),
                      },
                    ],
                  };
                }

                return chat;
              }
            );

          setChats(
            finalChats
          );

          setIsTyping(
            false
          );
        },
        1200
      );
    };
    return (
  <>
    {!loggedIn ? (
      // PANTALLA LOGIN
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #1b1b1b, #0f0f0f)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: CARD,
            padding: "40px",
            borderRadius: "30px",
            width: "100%",
            maxWidth: "420px",
            textAlign: "center",
            border: `1px solid ${GOLD}`,
            boxShadow: `0 0 35px ${GOLD}33`,
          }}
        >
<img
  src={logo}
  alt="Lumia"
  style={{
    width: "200px",
    marginBottom: "20px",
    filter:
      "drop-shadow(0 0 35px rgba(245,197,66,.9))",
  }}
/>

          <h1
            style={{
              color: GOLD,
              marginBottom: "10px",
            }}
          >
            Lumia
          </h1>

          <p
            style={{
              color: "#ccc",
              marginBottom: "25px",
            }}
          >
            Chatbot educativo de Siglo XXI
          </p>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Ingresa tu nombre"
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "15px",
              border: `1px solid ${GOLD}`,
              background: "#111",
              color: "white",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={() => {
              if (username.trim()) {
                setLoggedIn(true);
              }
            }}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              borderRadius: "15px",
              border: "none",
              background: GOLD,
              color: "#111",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    ) : (
      // APP
      <div
        style={{
          display: "flex",
          height: "100vh",
background: `
radial-gradient(
circle at top left,
rgba(245,197,66,.12),
transparent 30%
),
radial-gradient(
circle at bottom right,
rgba(245,197,66,.08),
transparent 35%
),
#0f0f0f
`,
          color: "white",
        }}
      >
        {/* SIDEBAR */}
        {sidebarOpen && (
          <div
            style={{
              width: isMobile
                ? "100%"
                : "300px",
              background: SIDEBAR,
              border: `1px solid ${GOLD}33`,
boxShadow: `0 0 25px ${GOLD}22`,
              borderRight:
                "1px solid #2d2d2d",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <img
                src={logo}
                alt="Lumia"
                style={{
                  width: "120px",
                  filter:
                    "drop-shadow(0 0 15px rgba(245,197,66,.8))",
                }}
              />

              <h2
                style={{
                  color: GOLD,
                  marginTop: "10px",
                }}
              >
                Lumia
              </h2>
            </div>

            <button
              onClick={createNewChat}
              
              style={{
                background: GOLD,
                color: "#111",
                border: "none",
                padding: "12px",
                borderRadius: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              + Nuevo chat
            </button>
            <input
  type="text"
  value={searchChat}
  onChange={(e) =>
    setSearchChat(
      e.target.value
    )
  }
  placeholder="🔍 Buscar chat..."
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  }}
/>

            <a
              href="https://classroom.google.com/"
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "12px",
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "15px",
                  border: "none",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Google Classroom
              </button>
            </a>

            <div
              style={{
                flex: 1,
                marginTop: "20px",
                overflowY: "auto",
              }}
            >
{filteredChats.map((chat) => (
  <div
    key={chat.id}
    style={{
      background:
        currentChatId === chat.id
          ? "#262626"
          : "#181818",
      padding: "12px",
      borderRadius: "12px",
      marginBottom: "10px",
      border:
        currentChatId === chat.id
          ? `1px solid ${GOLD}`
          : "1px solid transparent",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <span
      onClick={() => {
        setCurrentChatId(chat.id);

        if (isMobile) {
          setSidebarOpen(false);
        }
      }}
      style={{
        flex: 1,
        cursor: "pointer",
      }}
    >
      {chat.title}
    </span>

    {chats.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation();

          if (
            window.confirm(
              "¿Eliminar este chat?"
            )
          ) {
            deleteChat(chat.id);
          }
        }}
        style={{
          background:
            "transparent",
          border: "none",
          color: "#ff6b6b",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        🗑️
      </button>
    )}
  </div>
))}
            </div>

            <div
              style={{
                borderTop:
                  "1px solid #2d2d2d",
                paddingTop: "15px",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                }}
              >
                <div>
  👤 {username}
</div>

<div
  style={{
    fontSize: "13px",
    color: GOLD,
    marginTop: "3px",
  }}
>
  Estudiante
</div>
              </div>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* CHAT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
<div
  style={{
    padding: "20px",
    borderBottom:
      "1px solid #2d2d2d",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    color: GOLD,
    fontWeight: "bold",
    fontSize: "28px",
textShadow:
  `0 0 12px ${GOLD}55`,
  }}
>
  {isMobile && (
    <button
      onClick={() =>
        setSidebarOpen(
          !sidebarOpen
        )
      }
      style={{
        background:
          "transparent",
        border: "none",
        color: GOLD,
        fontSize: "24px",
        cursor: "pointer",
      }}
    >
      ☰
    </button>
  )}

  <span>
✨ {currentChat.title}
  </span>
</div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
            }}
          >
            {currentChat.messages.map(
              (msg, index) => (
<div
  key={index}
  style={{
    display: "flex",
    justifyContent:
      msg.sender === "user"
        ? "flex-end"
        : "flex-start",
    marginBottom: "15px",
    alignItems: "flex-end",
    gap: "10px",
  }}
>
 {msg.sender === "bot" && (
  <img
    src={logo}
    alt="Lumia"
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      flexShrink: 0,
      boxShadow: `0 0 15px ${GOLD}`,
    }}
  />
)}
  <div
    style={{
      maxWidth: "75%",
      padding: "15px",
      borderRadius: "20px",
      whiteSpace: "pre-wrap",
background:
  msg.sender === "user"
    ? GOLD
    : "linear-gradient(145deg,#222,#171717)",
    border:
  msg.sender === "bot"
    ? "1px solid rgba(245,197,66,.15)"
    : "none",

boxShadow:
  msg.sender === "bot"
    ? "0 0 15px rgba(245,197,66,.08)"
    : "none",
      color:
        msg.sender === "user"
          ? "#111"
          : "white",
      boxShadow:
        msg.sender === "bot"
          ? `0 0 12px ${GOLD}22`
          : "none",
    }}
  >
    {msg.text}

    <div
      style={{
        fontSize: "11px",
        marginTop: "8px",
        opacity: 0.7,
      }}
    >
      {msg.time}
    </div>
  </div>

  {msg.sender === "user" && (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      👤
    </div>
  )}

                </div>
              )
            )}

{currentChat.messages.length <= 1 && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "40px",
      textAlign: "center",
    }}
  >
    <img
      src={logo}
      alt="Lumia"
      style={{
        width: "140px",
        marginBottom: "20px",
        filter:
          "drop-shadow(0 0 25px rgba(245,197,66,.8))",
      }}
    />

    <h1
      style={{
        color: GOLD,
        margin: "0",
        fontSize: "42px",
        fontWeight: "700",
      }}
    >
      Lumia
    </h1>

    <p
      style={{
        color: "#bbb",
        marginTop: "10px",
        marginBottom: "35px",
        maxWidth: "500px",
        lineHeight: "1.6",
      }}
    >
      Tu luciérnaga guía de la Institución Educativa
      Siglo XXI.
      <br />
      ¿Qué deseas consultar hoy?
    </p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      {[
        {
          icon: "📅",
          text: "Horario",
        },
        {
          icon: "👕",
          text: "Uniforme",
        },
        {
          icon: "📋",
          text: "Planilla",
        },
        {
          icon: "⭐",
          text: "Actividades libres",
        },
        {
          icon: "🤝",
          text: "Corresponsabilidad",
        },
        {
          icon: "💻",
          text: "Classroom",
        },
      ].map((item) => (
        <button
          key={item.text}
          onClick={() =>
            setInput(item.text)
          }
          style={{
            background: "#1b1b1b",
            border: `1px solid ${GOLD}`,
            color: "white",
            padding: "18px",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "15px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              marginBottom: "8px",
            }}
          >
            {item.icon}
          </div>

          <div>{item.text}</div>
        </button>
      ))}
    </div>
  </div>
)}
            {isTyping && (
              <div
                style={{
                  color: GOLD,
                }}
              >
                💡 Lumia está iluminando una
                respuesta...
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            style={{
              padding: "15px",
              borderTop:
                "1px solid #2d2d2d",
              display: "flex",
              gap: "10px",
            }}
          >
            <textarea
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Escribe tu mensaje..."
              style={{
                flex: 1,
                resize: "none",
                padding: "15px",
                borderRadius: "18px",
                border:
                  "1px solid #333",
                background:
                "linear-gradient(145deg,#1a1a1a,#131313)",
                boxShadow:
              "inset 0 0 10px rgba(245,197,66,.08)",
                color: "white",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
               boxShadow:
               `0 0 15px ${GOLD}55`,
                background: GOLD,
                color: "#111",
                border: "none",
                borderRadius: "18px",
                padding: "0 25px",
                fontWeight: "bold",
                cursor: "pointer",
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