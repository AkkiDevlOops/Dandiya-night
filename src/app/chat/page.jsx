"use client";



import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { io } from "socket.io-client";



import {

  ArrowLeft,

  Search,

  Phone,

  Video,

  MoreVertical,

  Smile,

  Send,

} from "lucide-react";



export default function Chat() {

  // ============================================================

  // SEARCH PARAMS

  // ============================================================



  const searchParams = useSearchParams();



  const conversationId =

    searchParams.get("conversationId");



  // ============================================================

  // STATE

  // ============================================================



  const [conversations, setConversations] =

    useState([]);



  const [selectedConversation, setSelectedConversation] =

    useState(null);



  const [messages, setMessages] =

    useState([]);



  const [message, setMessage] =

    useState("");



  const [search, setSearch] =

    useState("");



  const [loadingConversations, setLoadingConversations] =

    useState(true);



  const [loadingMessages, setLoadingMessages] =

    useState(false);



  const [sending, setSending] =

    useState(false);



  const [error, setError] =

    useState("");



  // NEW:

  // This comes from /api/conversations

  const [currentUserId, setCurrentUserId] =

    useState(null);



  const messagesEndRef =

    useRef(null);



    const socketRef = useRef(null);



    const [profileData, setProfileData] = useState(null);

const [loadingProfile, setLoadingProfile] = useState(false);

const [profilePhotoIndex, setProfilePhotoIndex] = useState(0);

  // Mobile: swipe between Chat and Profile
  const [mobileView, setMobileView] = useState("chat");
  const touchStartXRef = useRef(null);



  // ============================================================

  // GET OTHER USER FROM CONVERSATION

  // ============================================================



  const getOtherUser = (conversation) => {

    if (

      !conversation?.participants ||

      conversation.participants.length === 0

    ) {

      return null;

    }



    // If we know the logged-in user's ID,

    // find the participant who isn't the current user.

    if (currentUserId) {

      const otherUser =

        conversation.participants.find(

          (participant) =>

            String(participant?._id) !==

            String(currentUserId)

        );



      return (

        otherUser ||

        conversation.participants[0]

      );

    }



    // Fallback while currentUserId is loading

    return conversation.participants[0];

  };



  // ============================================================

  // GET USER IMAGE

  // ============================================================



  const getUserImage = (user) => {

    if (!user) {

      return "https://i.pravatar.cc/150";

    }



    return (

      // user.profileImage ||

      // user.image ||

      user.images?.[0] ||

      "https://i.pravatar.cc/150"

    );

  };



  // ============================================================

  // GET USER BRANCH

  // ============================================================



  const getUserBranch = (user) => {

    if (!user) {

      return "";

    }



    return user.branch || "";

  };



  // ============================================================

  // GET USER YEAR

  // ============================================================



  const getUserYear = (user) => {

    if (!user) {

      return "";

    }



    return (

      user.year ||

      user.semester ||

      ""

    );

  };



  // ============================================================

  // FETCH ALL CONVERSATIONS

  // ============================================================



  const fetchConversations = async () => {

    try {

      setLoadingConversations(true );

      setError("");



      const response = await fetch(

        "/api/conversations",

        {

          credentials: "include",

        }

      );



      const data =

        await response.json();



      if (!response.ok || !data.success) {

        throw new Error(

          data.message ||

            "Failed to fetch conversations"

        );

      }



      // IMPORTANT:

      // Backend now sends currentUserId

      setCurrentUserId(

        data.currentUserId

      );



      setConversations(

        data.conversations || []

      );

    } catch (error) {

      console.error(

        "Fetch conversations error:",

        error

      );



      setError(

        error.message ||

          "Unable to fetch conversations"

      );

    } finally {

      setLoadingConversations(false);

    }

  };



  // ============================================================

  // LOAD CONVERSATIONS WHEN PAGE OPENS

  // ============================================================



  useEffect(() => {

    fetchConversations();

  }, []);



  // ============================================================

  // AUTO SELECT CONVERSATION FROM URL

  // ============================================================



  useEffect(() => {

    if (

      !conversationId ||

      !conversations.length

    ) {

      return;

    }



    const targetConversation =

      conversations.find(

        (conversation) =>

          String(conversation._id) ===

          String(conversationId)

      );



    if (targetConversation) {

      handleSelectConversation(

        targetConversation

      );

    }

  }, [

    conversationId,

    conversations,

  ]);



  //socket io



// ============================================================

// SOCKET.IO

// ============================================================



// ============================================================

// SOCKET.IO REAL-TIME CHAT

// ============================================================



// useEffect(() => {

//   const socket = io("http://localhost:3000", {

//     withCredentials: true,

//   });



//   socketRef.current = socket;



//   // ----------------------------------------------------------

//   // SOCKET CONNECTED

//   // ----------------------------------------------------------



//   socket.on("connect", () => {

//     console.log(

//       "🟢 SOCKET CONNECTED:",

//       socket.id

//     );



//     if (conversationId) {

//       socket.emit(

//         "joinConversation",

//         conversationId

//       );



//       console.log(

//         "➡️ JOINED ROOM:",

//         `conversation:${conversationId}`

//       );

//     }

//   });



//   // ----------------------------------------------------------

//   // RECEIVE MESSAGE

//   // ----------------------------------------------------------



//   socket.on("newMessage", (newMessage) => {

//     console.log(

//       "📩 NEW MESSAGE RECEIVED:",

//       newMessage

//     );



//     // Make sure this message belongs

//     // to the currently opened conversation

//     if (

//       String(newMessage.conversationId) !==

//       String(conversationId)

//     ) {

//       console.log(

//         "⚠️ Message belongs to another conversation"

//       );



//       return;

//     }



//     setMessages((prev) => {

//       // Prevent duplicate messages

//       const exists = prev.some(

//         (msg) =>

//           String(msg._id) ===

//           String(newMessage._id)

//       );



//       if (exists) {

//         console.log(

//           "⚠️ Duplicate message ignored"

//         );



//         return prev;

//       }



//       console.log(

//         "✅ Adding message to UI"

//       );



//       return [

//         ...prev,

//         newMessage,

//       ];

//     });



//     // Update conversation preview

//     setConversations((prev) =>

//       prev.map((conversation) => {

//         if (

//           String(conversation._id) ===

//           String(newMessage.conversationId)

//         ) {

//           return {

//             ...conversation,

//             lastMessage:

//               newMessage.text,

//             lastMessageAt:

//               newMessage.createdAt,

//           };

//         }



//         return conversation;

//       })

//     );



//     // Update selected conversation preview

//     setSelectedConversation((prev) => {

//       if (

//         !prev ||

//         String(prev._id) !==

//           String(newMessage.conversationId)

//       ) {

//         return prev;

//       }



//       return {

//         ...prev,

//         lastMessage:

//           newMessage.text,

//         lastMessageAt:

//           newMessage.createdAt,

//       };

//     });

//   });



//   // ----------------------------------------------------------

//   // DISCONNECT

//   // ----------------------------------------------------------



//   socket.on("disconnect", () => {

//     console.log(

//       "🔴 SOCKET DISCONNECTED"

//     );

//   });



//   // ----------------------------------------------------------

//   // CLEANUP

//   // ----------------------------------------------------------



//   return () => {

//     if (conversationId) {

//       socket.emit(

//         "leaveConversation",

//         conversationId

//       );

//     }



//     socket.disconnect();

//     socketRef.current = null;

//   };

// }, [conversationId]);





// ============================================================

// SOCKET.IO CONNECTION

// ============================================================



useEffect(() => {

 const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {

  withCredentials: true,

  transports: ["websocket"],

});



  socketRef.current = socket;



  // socket.on("connect", () => {

  //   console.log(

  //     "🟢 SOCKET CONNECTED:",

  //     socket.id

  //   );

  // });



  // socket.on("disconnect", () => {

  //   console.log(

  //     "🔴 SOCKET DISCONNECTED"

  //   );

  // });



  socket.on("connect", () => {

  console.log("🟢 SOCKET CONNECTED:", socket.id);

});



socket.on("connect_error", (error) => {

  console.error("❌ SOCKET CONNECTION ERROR:", error.message);

});



socket.on("disconnect", (reason) => {

  console.log("🔴 SOCKET DISCONNECTED:", reason);

});



  return () => {

    console.log(

      "🔌 CLOSING SOCKET"

    );



    socket.disconnect();

    socketRef.current = null;

  };

}, []);



// ============================================================

// JOIN / LEAVE CONVERSATION ROOM

// ============================================================



useEffect(() => {

  const socket = socketRef.current;



  if (!socket || !conversationId) {

    return;

  }



  const joinRoom = () => {

    socket.emit(

      "joinConversation",

      conversationId

    );



    console.log(

      "➡️ JOINED ROOM:",

      `conversation:${conversationId}`

    );

  };



  // Socket already connected

  if (socket.connected) {

    joinRoom();

  } else {

    // Wait until socket connects

    socket.once(

      "connect",

      joinRoom

    );

  }



  return () => {

    socket.off(

      "connect",

      joinRoom

    );



    socket.emit(

      "leaveConversation",

      conversationId

    );



    console.log(

      "⬅️ LEFT ROOM:",

      `conversation:${conversationId}`

    );

  };

}, [conversationId]);



// ============================================================

// RECEIVE REAL-TIME MESSAGES

// ============================================================



useEffect(() => {

  const socket = socketRef.current;



  if (!socket) {

    return;

  }



  const handleNewMessage = (newMessage) => {

    console.log(

      "📩 NEW MESSAGE RECEIVED:",

      newMessage

    );



    // Only handle message for current conversation

    if (

      String(newMessage.conversationId) !==

      String(conversationId)

    ) {

      return;

    }



    setMessages((prev) => {

      // Prevent duplicate message

      const alreadyExists = prev.some(

        (msg) =>

          String(msg._id) ===

          String(newMessage._id)

      );



      if (alreadyExists) {

        console.log(

          "⚠️ Duplicate message ignored"

        );



        return prev;

      }



      console.log(

        "✅ Adding message to chat"

      );



      return [

        ...prev,

        newMessage,

      ];

    });



    // Update conversation preview

    setConversations((prev) =>

      prev.map((conversation) => {

        if (

          String(conversation._id) ===

          String(newMessage.conversationId)

        ) {

          return {

            ...conversation,

            lastMessage:

              newMessage.text,

            lastMessageAt:

              newMessage.createdAt,

          };

        }



        return conversation;

      })

    );



    // Update selected conversation

    setSelectedConversation((prev) => {

      if (

        !prev ||

        String(prev._id) !==

          String(newMessage.conversationId)

      ) {

        return prev;

      }



      return {

        ...prev,

        lastMessage:

          newMessage.text,

        lastMessageAt:

          newMessage.createdAt,

      };

    });

  };



  socket.on(

    "newMessage",

    handleNewMessage

  );



  return () => {

    socket.off(

      "newMessage",

      handleNewMessage

    );

  };

}, [conversationId]);









  // ============================================================

  // FETCH MESSAGES

  // ============================================================



  const fetchMessages = async (

    conversationId

  ) => {

    try {

      setLoadingMessages(true);

      setError("");



      const response = await fetch(

        `/api/conversations/${conversationId}/messages`,

        {

          method: "GET",

          credentials: "include",

        }

      );



      const data =

        await response.json();



      if (

        !response.ok ||

        !data.success

      ) {

        throw new Error(

          data.message ||

            "Failed to fetch messages"

        );

      }



      setMessages(

        data.messages || []

      );

    } catch (error) {

      console.error(

        "Fetch Messages Error:",

        error

      );



      setMessages([]);



      setError(

        error.message ||

          "Unable to load messages"

      );

    } finally {

      setLoadingMessages(false);

    }

  };



  const fetchProfile = async (conversationId) => {

  try {

    setLoadingProfile(true);



    const response = await fetch(

      `/api/conversations/${conversationId}/profile`,

      {

        method: "GET",

        credentials: "include",

        cache: "no-store",

      }

    );



    const data = await response.json();



    if (!response.ok || !data.success) {

      throw new Error(

        data.message || "Failed to load profile"

      );

    }



    setProfileData(data.profile);

    setProfilePhotoIndex(0);



  } catch (error) {

    console.error("PROFILE FETCH ERROR:", error);

    setProfileData(null);

  } finally {

    setLoadingProfile(false);

  }

};





  // ============================================================

  // SELECT CONVERSATION

  // ============================================================



  const handleSelectConversation = (

    conversation

  ) => {

    setSelectedConversation(

      conversation

    );

    setMobileView("chat");



    setMessages([]);



    fetchMessages(

      conversation._id

    );



    fetchProfile(conversation._id);





  };



  // ============================================================

  // AUTO SCROLL

  // ============================================================



  const scrollToBottom = () => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  };



  useEffect(() => {

    if (messages.length > 0) {

      scrollToBottom();

    }

  }, [messages]);



  // ============================================================

  // SEND MESSAGE

  // ============================================================



  const sendMessage = async () => {

    if (!message.trim()) {

      return;

    }



    if (!selectedConversation) {

      return;

    }



    try {

      setSending(true);

      setError("");



      const response = await fetch(

        `/api/conversations/${selectedConversation._id}/messages`,

        {

          method: "POST",

          credentials: "include",



          headers: {

            "Content-Type":

              "application/json",

          },



          body: JSON.stringify({

            text: message.trim(),

          }),

        }

      );



      const data =

        await response.json();



      if (

        !response.ok ||

        !data.success

      )



      {

        throw new Error(

          data.message ||

            "Failed to send message"

        );

      }

         socketRef.current?.emit("sendMessage", {

      conversationId: selectedConversation._id,

      message: data.message,

    });



      // Add newly created message

      setMessages((prev) => [

        ...prev,

        data.message,

      ]);



      // Clear input

      setMessage("");



      // Update conversation's last message

      setConversations((prev) =>

        prev.map((conversation) => {

          if (

            String(conversation._id) ===

            String(

              selectedConversation._id

            )

          ) {

            return {

              ...conversation,



              lastMessage:

                data.message.text,



              lastMessageAt:

                data.message.createdAt,

            };

          }



          return conversation;

        })

      );



      // Also update selected conversation

      setSelectedConversation(

        (prev) =>

          prev

            ? {

                ...prev,



                lastMessage:

                  data.message.text,



                lastMessageAt:

                  data.message.createdAt,

              }

            : prev

      );

    } catch (error) {

      console.error(

        "Send Message Error:",

        error

      );



      setError(

        error.message ||

          "Unable to send message"

      );

    } finally {

      setSending(false);

    }

  };



  // ============================================================

  // ENTER TO SEND

  // ============================================================



  const handleKeyDown = (e) => {

    if (

      e.key === "Enter" &&

      !e.shiftKey

    ) {

      e.preventDefault();



      sendMessage();

    }

  };



  // ============================================================

  // FORMAT MESSAGE TIME

  // ============================================================



  const formatTime = (date) => {

    if (!date) {

      return "";

    }



    return new Date(

      date

    ).toLocaleTimeString([], {

      hour: "2-digit",

      minute: "2-digit",

    });

  };



  // ============================================================

  // FORMAT LAST MESSAGE TIME

  // ============================================================



  const formatLastMessageTime = (

    date

  ) => {

    if (!date) {

      return "";

    }



    const messageDate =

      new Date(date);



    const now = new Date();



    const diff =

      now.getTime() -

      messageDate.getTime();



    const minutes = Math.floor(

      diff / (1000 * 60)

    );



    const hours = Math.floor(

      minutes / 60

    );



    const days = Math.floor(

      hours / 24

    );



    if (minutes < 1) {

      return "now";

    }



    if (minutes < 60) {

      return `${minutes}m`;

    }



    if (hours < 24) {

      return `${hours}h`;

    }



    if (days === 1) {

      return "1d";

    }



    return `${days}d`;

  };



  // ============================================================

  // FILTER CONVERSATIONS

  // ============================================================



  const filteredConversations =

    conversations.filter(

      (conversation) => {

        const user =

          getOtherUser(

            conversation

          );



        if (!user) {

          return false;

        }



        const name =

          user.name ||

          user.username ||

          "";



        return name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          );

      }

    );



  // ============================================================

  // SELECTED USER

  // ============================================================



  const selectedUser =

    selectedConversation

      ? getOtherUser(

          selectedConversation

        )

      : null;





  const profilePhotos = Array.isArray(profileData?.images)

  ? profileData.images.filter(

      (image) =>

        typeof image === "string" &&

        image.trim() !== ""

    )

  : [];



const currentProfileImage =

  profilePhotos[profilePhotoIndex] ||

  "/default-profile.jpg";



const nextProfilePhoto = () => {

  if (profilePhotos.length <= 1) return;



  setProfilePhotoIndex(

    (current) =>

      (current + 1) % profilePhotos.length

  );

};



const previousProfilePhoto = () => {

  if (profilePhotos.length <= 1) return;



  setProfilePhotoIndex(

    (current) =>

      (current - 1 + profilePhotos.length) %

      profilePhotos.length

  );

};



  // ============================================================

  // ============================================================
  // MOBILE CHAT / PROFILE SWIPE
  // ============================================================

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    touchStartXRef.current = null;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      setMobileView("profile");
    } else {
      setMobileView("chat");
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="min-h-screen bg-[#fffaf3] text-[#2d2424] p-3 md:p-5"
    >
      <div
        className="
          max-w-7xl mx-auto
          h-[calc(100vh-24px)] md:h-[calc(100vh-40px)]
          bg-[#fffdf9] rounded-3xl overflow-hidden
          border border-[#eadfd3]
          shadow-[0_10px_40px_rgba(90,50,30,0.08)]
          flex min-h-0
        "
      >
        {/* ==================================================
            LEFT SIDE / CONVERSATIONS
        ================================================== */}
        <div
          className={
            selectedConversation
              ? "hidden md:flex w-full md:w-[350px] lg:w-[370px] flex-shrink-0 flex-col bg-[#fffaf4] border-r border-[#eadfd3] min-h-0"
              : "flex w-full md:w-[350px] lg:w-[370px] flex-shrink-0 flex-col bg-[#fffaf4] border-r border-[#eadfd3] min-h-0"
          }
        >
          {/* HEADER */}
          <div className="px-5 pt-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#292222]">
                  My Garba Circle
                </h1>
                <p className="text-sm text-[#8b7d73] mt-1">
                  People you connected with
                </p>
              </div>

              <button
                type="button"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f3e7dc] transition"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* SEARCH */}
          <div className="px-5 pb-4 flex-shrink-0">
            <div className="h-11 rounded-xl bg-white border border-[#eadfd3] flex items-center px-3">
              <Search size={18} className="text-[#91847a]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your connections..."
                className="flex-1 ml-2 bg-transparent outline-none text-sm text-[#352b29] placeholder:text-[#a79a90]"
              />
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mx-5 mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex-shrink-0">
              {error}
            </div>
          )}

          {/* CONVERSATIONS */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 pb-3">
            {loadingConversations ? (
              <div className="flex items-center justify-center py-10 text-sm text-[#8c7d74]">
                Loading connections...
              </div>
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => {
                const user = getOtherUser(conversation);

                if (!user) return null;

                const isSelected =
                  String(selectedConversation?._id) ===
                  String(conversation._id);

                return (
                  <button
                    key={conversation._id}
                    type="button"
                    onClick={() => handleSelectConversation(conversation)}
                    className={
                      isSelected
                        ? "w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl text-left transition bg-[#f8ede3]"
                        : "w-full flex items-center gap-3 px-3 py-3.5 rounded-2xl text-left transition hover:bg-[#faf1e8]"
                    }
                  >
                    {/* IMAGE */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={getUserImage(user)}
                        alt={user.name || user.username || "User"}
                        className="w-13 h-13 w-[52px] h-[52px] rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      {user.online && (
                        <span className="absolute right-0 bottom-0 w-3.5 h-3.5 bg-[#56b870] rounded-full border-2 border-white" />
                      )}
                    </div>

                    {/* USER INFO */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center gap-2">
                        <h3 className="font-semibold text-[15px] text-[#332927] truncate">
                          {user.name || user.username || "User"}
                        </h3>
                        <span className="text-[11px] text-[#9a8b81] flex-shrink-0">
                          {formatLastMessageTime(conversation.lastMessageAt)}
                        </span>
                      </div>

                      <p className="text-xs text-[#8c7d74] mt-0.5 truncate">
                        {getUserYear(user)}
                        {getUserYear(user) && getUserBranch(user) ? " • " : ""}
                        {getUserBranch(user)}
                      </p>

                      <p className="text-sm text-[#766961] truncate mt-1">
                        {conversation.lastMessage || "Start a conversation ✨"}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 px-5">
                <div className="text-4xl mb-3">💬</div>
                <p className="font-semibold text-[#403431]">No chats yet</p>
                <p className="text-sm text-[#8c7d74] mt-1">
                  Match with someone to start chatting!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}
        <div
          className={
            selectedConversation
              ? "flex flex-1 min-w-0 min-h-0 flex-col bg-[#fffaf4]"
              : "hidden md:flex flex-1 min-w-0 min-h-0 flex-col bg-[#fffaf4]"
          }
        >
          {selectedUser ? (
            <>
              {/* ==================================================
                  CHAT HEADER
              ================================================== */}
              <div className="h-[72px] md:h-[78px] flex-shrink-0 bg-[#fffdf9] border-b border-[#eadfd3] flex items-center px-4 md:px-6 gap-3">
                {/* MOBILE BACK */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedConversation(null);
                    setMessages([]);
                    setProfileData(null);
                    setMobileView("chat");
                  }}
                  className="md:hidden w-9 h-9 rounded-full hover:bg-[#f4e9df] flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>

                {/* IMAGE */}
                <div className="relative flex-shrink-0">
                  <img
                    src={getUserImage(selectedUser)}
                    alt={selectedUser.name || selectedUser.username || "User"}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  {selectedUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#56b870] border-2 border-white" />
                  )}
                </div>

                {/* NAME */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-[#302725] truncate">
                    {selectedUser.name || selectedUser.username || "User"}
                  </h2>
                  <p
                    className={`text-xs ${
                      selectedUser.online ? "text-[#58a968]" : "text-[#9a8b81]"
                    }`}
                  >
                    {selectedUser.online ? "Online" : "Offline"}
                  </p>
                </div>

                {/* ACTIONS */}
                {/* <button
                  type="button"
                  className="w-10 h-10 rounded-full hover:bg-[#f4e9df] flex items-center justify-center text-[#5d514b]"
                >
                  <Phone size={19} />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full hover:bg-[#f4e9df] flex items-center justify-center text-[#5d514b]"
                >
                  <Video size={20} />
                </button> */}
              </div>

              {/* ==================================================
                  MOBILE CHAT / PROFILE TABS
              ================================================== */}
              <div className="lg:hidden flex-shrink-0 h-[54px] bg-[#fffdf9] border-b border-[#eadfd3] grid grid-cols-2">
                <button type="button" onClick={() => setMobileView("chat")} className={`relative flex items-center justify-center text-sm font-semibold transition ${mobileView === "chat" ? "text-[#4a1525]" : "text-[#9a8b81]"}`}>
                  Chat
                  {mobileView === "chat" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4a1525]" />}
                </button>
                <button type="button" onClick={() => setMobileView("profile")} className={`relative flex items-center justify-center text-sm font-semibold transition ${mobileView === "profile" ? "text-[#4a1525]" : "text-[#9a8b81]"}`}>
                  Profile
                  {mobileView === "profile" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4a1525]" />}
                </button>
              </div>

              {/* ==================================================
                  CHAT BODY + PROFILE
              ================================================== */}
              <div className="flex-1 min-h-0 min-w-0 overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <div className={`flex h-full min-h-0 w-[200%] lg:w-full transition-transform duration-300 ease-out ${mobileView === "profile" ? "-translate-x-1/2 lg:translate-x-0" : "translate-x-0"}`}>
                  {/* ================= CHAT COLUMN ================= */}
                  <div className="w-1/2 lg:w-auto lg:flex-1 min-w-0 min-h-0 flex flex-col">
                  {/* MESSAGE AREA */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 py-5 md:py-6">
                    <div className="max-w-3xl mx-auto space-y-3.5">
                      {loadingMessages ? (
                        <div className="flex items-center justify-center py-10 text-sm text-[#8c7d74]">
                          Loading messages...
                        </div>
                      ) : messages.length > 0 ? (
                        messages.map((msg) => {
                          const senderId =
                            typeof msg.sender === "object"
                              ? msg.sender?._id
                              : msg.sender;

                          const isMyMessage =
                            String(senderId) === String(currentUserId);

                          return (
                            <div
                              key={msg._id}
                              className={
                                isMyMessage
                                  ? "flex items-end gap-2 justify-end"
                                  : "flex items-end gap-2 justify-start"
                              }
                            >
                              {!isMyMessage && (
                                <img
                                  src={getUserImage(selectedUser)}
                                  alt={
                                    selectedUser.name ||
                                    selectedUser.username ||
                                    "User"
                                  }
                                  className="w-8 h-8 rounded-full object-cover self-end flex-shrink-0"
                                />
                              )}

                              <div
                                className={
                                  isMyMessage
                                    ? "max-w-[78%] md:max-w-[65%] px-4 py-3 text-sm leading-relaxed bg-[#f6dfc5] text-[#4a342b] rounded-2xl rounded-br-md"
                                    : "max-w-[78%] md:max-w-[65%] px-4 py-3 text-sm leading-relaxed bg-white border border-[#eee2d8] text-[#433734] rounded-2xl rounded-bl-md shadow-sm"
                                }
                              >
                                <div className="break-words whitespace-pre-wrap">
                                  {msg.text}
                                </div>
                                <div
                                  className={
                                    isMyMessage
                                      ? "text-[10px] mt-1 text-right text-[#927765]"
                                      : "text-[10px] mt-1 text-right text-[#a09389]"
                                  }
                                >
                                  {formatTime(msg.createdAt)}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="text-5xl mb-3">👋</div>
                          <h3 className="font-semibold text-[#403431]">
                            Start the conversation
                          </h3>
                          <p className="text-sm text-[#8c7d74] mt-1">
                            Say hello to {selectedUser.name || selectedUser.username}
                          </p>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* MESSAGE INPUT */}
                  <div className="flex-shrink-0 bg-[#fffdf9] border-t border-[#eadfd3] px-4 md:px-6 py-3.5">
                    <div className="max-w-3xl mx-auto flex items-center gap-2">
                      <button
                        type="button"
                        className="flex-shrink-0 w-10 h-10 rounded-full hover:bg-[#f4e9df] flex items-center justify-center text-[#806f65]"
                      >
                        <Smile size={21} />
                      </button>

                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        disabled={sending}
                        className="flex-1 min-w-0 h-11 rounded-full bg-[#f8f1ea] border border-[#eadfd3] px-5 outline-none text-sm text-[#3c302d] placeholder:text-[#a4968c] focus:border-[#b76b75] transition disabled:opacity-60"
                      />

                      <button
                        type="button"
                        onClick={sendMessage}
                        disabled={!message.trim() || sending}
                        className="flex-shrink-0 w-11 h-11 rounded-full bg-[#8e2940] text-white flex items-center justify-center shadow-sm hover:bg-[#792236] disabled:opacity-40 disabled:cursor-not-allowed transition"
                      >
                        <Send size={19} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ================= PROFILE PANEL ================= */}
                <div className="w-1/2 lg:w-[320px] 2xl:w-[350px] flex-shrink-0 flex flex-col bg-[#fffdf9] border-l border-[#eadfd3] min-h-0">
                  {loadingProfile ? (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-8 h-8 border-4 border-[#4a1525]/20 border-t-[#4a1525] rounded-full animate-spin mx-auto" />
                        <p className="mt-3 text-sm text-[#8c7d74]">
                          Loading profile...
                        </p>
                      </div>
                    </div>
                  ) : profileData ? (
                    <div className="flex-1 min-h-0 overflow-y-auto">
                      {/* PROFILE HEADER */}
                      <div className="sticky top-0 z-20 bg-[#fffdf9]/95 backdrop-blur px-4 pt-4 pb-3 border-b border-[#eadfd3]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#a09389]">
                              Your Match
                            </p>
                            <h2 className="text-lg font-black text-[#4a1525] mt-0.5 truncate">
                              {profileData.username}
                            </h2>
                          </div>
                          <div className="px-2.5 py-1.5 rounded-full bg-[#f5e8e9] text-[#4a1525] text-[11px] font-semibold flex-shrink-0">
                            Matched
                          </div>
                        </div>
                      </div>

                      {/* PROFILE CONTENT */}
                      <div className="px-4 pb-6">
                        {/* PHOTO */}
                        <div className="relative mt-4 overflow-hidden rounded-[20px]">
                          <img
                            src={currentProfileImage}
                            alt={profileData.username || "Profile"}
                            className="w-full h-[270px] 2xl:h-[290px] object-cover"
                          />

                          {profilePhotos.length > 1 && (
                            <div className="absolute top-3 left-3 right-3 flex gap-1">
                              {profilePhotos.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-1 flex-1 rounded-full ${
                                    index === profilePhotoIndex
                                      ? "bg-white"
                                      : "bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          )}

                          {profilePhotos.length > 1 && (
                            <button
                              type="button"
                              onClick={previousProfilePhoto}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
                            >
                              ←
                            </button>
                          )}

                          {profilePhotos.length > 1 && (
                            <button
                              type="button"
                              onClick={nextProfilePhoto}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
                            >
                              →
                            </button>
                          )}
                        </div>

                        {/* NAME */}
                        <div className="pt-4">
                          <h1 className="text-xl font-black text-gray-900">
                            {profileData.username}
                          </h1>
                        </div>

                        {/* BASIC INFORMATION */}
                        <div className="pt-4">
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="rounded-xl bg-[#fdfbf7] p-3">
                              <p className="text-[11px] text-gray-400">Height</p>
                              <p className="mt-1 text-sm font-bold text-gray-900">
                                {profileData.height
                                  ? `${profileData.height} cm`
                                  : "—"}
                              </p>
                            </div>

                            <div className="rounded-xl bg-[#fdfbf7] p-3">
                              <p className="text-[11px] text-gray-400">Branch</p>
                              <p className="mt-1 text-sm font-bold text-gray-900 truncate">
                                {profileData.branch || "—"}
                              </p>
                            </div>

                            <div className="rounded-xl bg-[#fdfbf7] p-3">
                              <p className="text-[11px] text-gray-400">Semester</p>
                              <p className="mt-1 text-sm font-bold text-gray-900">
                                {profileData.semester || "—"}
                              </p>
                            </div>

                            <div className="rounded-xl bg-[#fdfbf7] p-3">
                              <p className="text-[11px] text-gray-400">Gender</p>
                              <p className="mt-1 text-sm font-bold text-gray-900">
                                {profileData.gender || "—"}
                              </p>
                            </div>
                          </div>

                          {/* COLLEGE */}
                          <div className="mt-2.5 rounded-xl bg-[#fdfbf7] p-3">
                            <p className="text-[11px] text-gray-400">College</p>
                            <p className="mt-1 text-sm font-bold text-gray-900 leading-snug">
                              {profileData.college || "—"}
                            </p>
                          </div>
                        </div>

                        {/* INTERESTS */}
                        {Array.isArray(profileData.interests) &&
                          profileData.interests.length > 0 && (
                            <div className="pt-6">
                              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                                Interests
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {profileData.interests.map((interest, index) => (
                                  <span
                                    key={`${interest}-${index}`}
                                    className="px-2.5 py-1.5 rounded-full bg-[#4a1525]/10 text-[#4a1525] text-xs font-medium"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* PROMPTS */}
                        {Array.isArray(profileData.prompts) &&
                          profileData.prompts.length > 0 && (
                            <div className="pt-6">
                              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                                Get to know {profileData.username}
                              </h3>
                              <div className="space-y-2.5">
                                {profileData.prompts.map((prompt, index) => (
                                  <div
                                    key={prompt._id || prompt.id || index}
                                    className="border border-gray-200 rounded-xl p-3"
                                  >
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                      {prompt.question}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                                      {prompt.answer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center px-6 text-center">
                      <div>
                        <div className="text-4xl mb-3">💜</div>
                        <p className="font-semibold text-[#403431]">
                          Profile unavailable
                        </p>
                        <p className="text-sm text-[#8c7d74] mt-1">
                          We couldn't load this profile.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </>
          ) : (
            /* ==================================================
               NO CONVERSATION SELECTED
            ================================================== */
            <div className="flex-1 flex items-center justify-center text-center px-6">
              <div>
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-xl font-semibold text-[#403431]">
                  Select a match
                </h2>
                <p className="text-[#8c7d74] mt-2">
                  Start a conversation with your Garba match
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}