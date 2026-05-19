import React, { useState, useEffect } from "react";

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
    const saved = localStorage.getItem(
      "lumia_current_chat"
    );

    return saved ? Number(saved) : 1;
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
    chats.find((chat) => chat.id === currentChatId) ||
    chats[0];

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

    const filtered = chats.filter(
      (chat) => chat.id !== chatId
    );

    setChats(filtered);
    setCurrentChatId(filtered[0].id);
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    // SALUDOS
    if (
      msg.includes("hola") ||
      msg.includes("buenas") ||
      msg.includes("hello")
    ) {
      return "¡Hola! 😊 Soy Lumia, el chatbot educativo del colegio SigloXXI. ¿En qué puedo ayudarte?";
    }

    // PRUEBAS DEL LIBRO
    if (
      msg.includes("prueba del libro") ||
      msg.includes("libro") ||
      msg.includes("icfes") ||
      msg.includes("lectura")
    ) {
      return "Las pruebas del libro son evaluaciones tipo ICFES de 20 preguntas relacionadas con el libro leído durante el mes. Cada pregunta vale 5 puntos y la nota máxima es 100. Si el estudiante obtiene 80 puntos o más, gana 3 actividades libres para sociales, español y lectura crítica. Si obtiene 25 puntos o menos, pierde 15 puntos en esas mismas materias. La prueba debe durar mínimo 40 minutos y máximo 80 minutos.";
    }

    // ACTIVIDADES LIBRES
    if (
      msg.includes("actividades libres") ||
      msg.includes("actividad libre") ||
      msg.includes("puntos libres")
    ) {
      return "Las actividades libres son actividades voluntarias propuestas por los profesores. Permiten obtener 50 puntos adicionales en la planilla y ayudan a subir de nivel académico. Deben entregarse antes de la fecha límite y cumplir todos los criterios.";
    }

    // PLANILLA
    if (
      msg.includes("planilla") ||
      msg.includes("notas") ||
      msg.includes("calificaciones") ||
      msg.includes("puntos")
    ) {
      return "El sistema calificativo funciona por puntos. Cada actividad tiene un valor específico. Una clase correctamente realizada vale 15 puntos. Los padres pueden revisar la planilla digital desde Drive. Se evalúan asistencia, imagen, participación, ejercitación y evaluación.";
    }

    // HORARIO
    if (
      msg.includes("horario") ||
      msg.includes("entrada") ||
      msg.includes("salida") ||
      msg.includes("descanso") ||
      msg.includes("almuerzo")
    ) {
      return "Las clases empiezan a las 6:30am y terminan a las 12:15pm. El descanso de lunes a jueves es de 10:10 a 10:30. Los viernes es de 9:00 a 10:00. El almuerzo es de 12:15 a 1:40 y la salida del colegio es a la 1:40pm.";
    }

    // UNIFORME
    if (
      msg.includes("uniforme") ||
      msg.includes("sudadera") ||
      msg.includes("falda") ||
      msg.includes("camisa")
    ) {
      return "Los estudiantes deben portar correctamente el uniforme. Las niñas deben llevar la camisa por dentro de la falda y la falda hasta la rodilla. Los niños deben llevar la camisa por dentro del pantalón y este no puede ser entubado. En educación física la sudadera tampoco puede ser entubada. Si no se cumple, el estudiante pierde puntos de imagen.";
    }

    // SISTEMA EDUCATIVO
    if (
      msg.includes("clases") ||
      msg.includes("ejercitaciones") ||
      msg.includes("proposito") ||
      msg.includes("preguntas orientadoras")
    ) {
      return "Las clases se dividen en propósito, enseñanza, procedimientos, preguntas orientadoras y ejercitaciones. Toda la clase vale 15 puntos. Cada ejercitación correcta vale 2 puntos. También se califican materiales e indisciplina.";
    }

    // CORRESPONSABILIDAD
    if (
      msg.includes("corresponsabilidad") ||
      msg.includes("aseo") ||
      msg.includes("zonas verdes")
    ) {
      return "La corresponsabilidad consiste en realizar acciones que mejoren el entorno escolar, como hacer aseo, embellecer zonas verdes o llevar productos para la institución. Esto otorga puntos al estudiante dependiendo de la actividad realizada.";
    }

    // ASISTENCIA
    if (
      msg.includes("asistencia") ||
      msg.includes("excusa") ||
      msg.includes("llegar tarde") ||
      msg.includes("baño")
    ) {
      return "La asistencia vale 5 puntos. Si el estudiante falta, el padre debe enviar una excusa. Si no la envía, pierde los puntos. También se pierden puntos al llegar tarde o salir al baño durante la clase.";
    }

    // GRACIAS
    if (
      msg.includes("gracias") ||
      msg.includes("thanks")
    ) {
      return "¡Con gusto! 😄";
    }

    // DEFAULT
    return "Lo siento 😅 todavía estoy aprendiendo sobre ese tema. Puedes preguntarme sobre horarios, uniforme, asistencia, pruebas del libro, planilla, corresponsabilidad y actividades libres.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const text = input;

    setInput("");
    setIsTyping(true);

    const updatedChats = chats.map((chat) => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          title:
            chat.title === "Nuevo chat"
              ? text.slice(0, 20)
              : chat.title,
          messages: [
            ...chat.messages,
            {
              text,
              sender: "user",
            },
          ],
        };
      }

      return chat;
    });

    setChats(updatedChats);

    setTimeout(() => {
      const finalChats = updatedChats.map((chat) => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                text: getBotResponse(text),
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
            background: "#1a1a1a",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontFamily: "Arial",
          }}
        >
          <div
            style={{
              background: "#222",
              padding: "40px",
              borderRadius: "20px",
              width: "350px",
              textAlign: "center",
            }}
          >
            <h1>✨ Lumia</h1>

            <p style={{ color: "#aaa" }}>
              Chatbot educativo de SigloXXI
            </p>

            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "20px",
                borderRadius: "12px",
                border: "none",
                background: "#333",
                color: "white",
                outline: "none",
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
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#0b93f6",
                color: "white",
                cursor: "pointer",
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
            height: "100vh",
            background: "#1a1a1a",
            color: "white",
            fontFamily: "Arial",
          }}
        >
          <div
            style={{
              width: "280px",
              background: "#111",
              padding: "20px",
              borderRight: "1px solid #333",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>✨ Lumia</h2>

            <button
              onClick={createNewChat}
              style={{
                marginTop: "20px",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#2a2a2a",
                color: "white",
                cursor: "pointer",
              }}
            >
              + Nuevo chat
            </button>

            <div
              style={{
                marginTop: "20px",
                flex: 1,
                overflowY: "auto",
              }}
            >
              <p style={{ color: "#888" }}>
                Chats recientes
              </p>

              {chats.map((chat) => (
                <div
                  key={chat.id}
                  style={{
                    marginTop: "10px",
                    padding: "12px",
                    borderRadius: "10px",
                    background:
                      currentChatId === chat.id
                        ? "#333"
                        : "#222",
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setCurrentChatId(chat.id)
                    }
                  >
                    {chat.title}
                  </span>

                  <button
                    onClick={() =>
                      deleteChat(chat.id)
                    }
                    style={{
                      background: "none",
                      border: "none",
                      color: "#999",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid #333",
                paddingTop: "15px",
              }}
            >
              👤 {username}

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#222",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>

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
                borderBottom: "1px solid #333",
                fontWeight: "bold",
              }}
            >
              {currentChat.title}
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
                    }}
                  >
                    <div
                      style={{
                        background:
                          msg.sender === "user"
                            ? "#0b93f6"
                            : "#333",
                        padding: "14px 18px",
                        borderRadius: "18px",
                        maxWidth: "65%",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                )
              )}

              {isTyping && (
                <div
                  style={{
                    color: "#999",
                  }}
                >
                  ✨ Lumia está escribiendo...
                </div>
              )}
            </div>

            <div
              style={{
                padding: "20px",
                borderTop: "1px solid #333",
                display: "flex",
                gap: "10px",
              }}
            >
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                style={{
                  flex: 1,
                  padding: "15px",
                  borderRadius: "14px",
                  border: "none",
                  background: "#2a2a2a",
                  color: "white",
                  outline: "none",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "15px 20px",
                  borderRadius: "14px",
                  border: "none",
                  background: "#0b93f6",
                  color: "white",
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