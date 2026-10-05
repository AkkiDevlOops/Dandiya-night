"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

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
      user.profileImage ||
      user.image ||
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
      setLoadingConversations(true);
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

  // ============================================================
  // SELECT CONVERSATION
  // ============================================================

  const handleSelectConversation = (
    conversation
  ) => {
    setSelectedConversation(
      conversation
    );

    setMessages([]);

    fetchMessages(
      conversation._id
    );
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
      ) {
        throw new Error(
          data.message ||
            "Failed to send message"
        );
      }

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

  // ============================================================
  // UI
  // ============================================================

  return (
    <div
      className="
        min-h-screen
        bg-[#fffaf3]
        text-[#2d2424]
        p-3
        md:p-5
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          h-[calc(100vh-24px)]
          md:h-[calc(100vh-40px)]
          bg-[#fffdf9]
          rounded-3xl
          overflow-hidden
          border
          border-[#eadfd3]
          shadow-[0_10px_40px_rgba(90,50,30,0.08)]
          flex
        "
      >
        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <div
          className={
            selectedConversation
              ? "hidden md:flex w-full md:w-[360px] lg:w-[390px] flex-col bg-[#fffaf4] border-r border-[#eadfd3]"
              : "flex w-full md:w-[360px] lg:w-[390px] flex-col bg-[#fffaf4] border-r border-[#eadfd3]"
          }
        >
          {/* HEADER */}

          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className="
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-[#292222]
                  "
                >
                  My Garba Circle
                </h1>

                <p
                  className="
                    text-sm
                    text-[#8b7d73]
                    mt-1
                  "
                >
                  People you connected with
                </p>
              </div>

              <button
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f3e7dc]
                "
              >
                <MoreVertical
                  size={20}
                />
              </button>
            </div>
          </div>

          {/* SEARCH */}

          <div className="px-5 pb-4">
            <div
              className="
                h-11
                rounded-xl
                bg-white
                border
                border-[#eadfd3]
                flex
                items-center
                px-3
              "
            >
              <Search
                size={18}
                className="text-[#91847a]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search your connections..."
                className="
                  flex-1
                  ml-2
                  bg-transparent
                  outline-none
                  text-sm
                  text-[#352b29]
                  placeholder:text-[#a79a90]
                "
              />
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
                mx-5
                mb-3
                px-3
                py-2
                rounded-lg
                bg-red-50
                border
                border-red-200
                text-red-600
                text-xs
              "
            >
              {error}
            </div>
          )}

          {/* ==================================================
              CONVERSATIONS
          ================================================== */}

          <div
            className="
              flex-1
              overflow-y-auto
              px-3
            "
          >
            {loadingConversations ? (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  py-10
                  text-sm
                  text-[#8c7d74]
                "
              >
                Loading connections...
              </div>
            ) : filteredConversations.length >
              0 ? (
              filteredConversations.map(
                (conversation) => {
                  const user =
                    getOtherUser(
                      conversation
                    );

                  if (!user) {
                    return null;
                  }

                  return (
                    <button
                      key={
                        conversation._id
                      }
                      onClick={() =>
                        handleSelectConversation(
                          conversation
                        )
                      }
                      className={
                        selectedConversation?._id ===
                        conversation._id
                          ? "w-full flex items-center gap-3 px-3 py-4 rounded-2xl text-left transition bg-[#f8ede3]"
                          : "w-full flex items-center gap-3 px-3 py-4 rounded-2xl text-left transition hover:bg-[#faf1e8]"
                      }
                    >
                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          flex-shrink-0
                        "
                      >
                        <img
                          src={getUserImage(
                            user
                          )}
                          alt={
                            user.name ||
                            user.username ||
                            "User"
                          }
                          className="
                            w-14
                            h-14
                            rounded-full
                            object-cover
                            border-2
                            border-white
                            shadow-sm
                          "
                        />

                        {user.online && (
                          <span
                            className="
                              absolute
                              right-0
                              bottom-0
                              w-3.5
                              h-3.5
                              bg-[#56b870]
                              rounded-full
                              border-2
                              border-white
                            "
                          />
                        )}
                      </div>

                      {/* USER INFO */}

                      <div
                        className="
                          flex-1
                          min-w-0
                        "
                      >
                        <div
                          className="
                            flex
                            justify-between
                            items-center
                          "
                        >
                          <h3
                            className="
                              font-semibold
                              text-[15px]
                              text-[#332927]
                            "
                          >
                            {user.name ||
                              user.username}
                          </h3>

                          <span
                            className="
                              text-[11px]
                              text-[#9a8b81]
                            "
                          >
                            {formatLastMessageTime(
                              conversation.lastMessageAt
                            )}
                          </span>
                        </div>

                        <p
                          className="
                            text-xs
                            text-[#8c7d74]
                            mt-0.5
                          "
                        >
                          {getUserYear(
                            user
                          )}

                          {getUserYear(
                            user
                          ) &&
                          getUserBranch(
                            user
                          )
                            ? " • "
                            : ""}

                          {getUserBranch(
                            user
                          )}
                        </p>

                        <p
                          className="
                            text-sm
                            text-[#766961]
                            truncate
                            mt-1
                          "
                        >
                          {conversation.lastMessage ||
                            "Start a conversation ✨"}
                        </p>
                      </div>
                    </button>
                  );
                }
              )
            ) : (
              <div
                className="
                  text-center
                  py-12
                  px-5
                "
              >
                <div className="text-4xl mb-3">
                  💬
                </div>

                <p
                  className="
                    font-semibold
                    text-[#403431]
                  "
                >
                  No chats yet
                </p>

                <p
                  className="
                    text-sm
                    text-[#8c7d74]
                    mt-1
                  "
                >
                  Match with someone to
                  start chatting!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            RIGHT CHAT
        ================================================== */}

        <div
          className={
            selectedConversation
              ? "flex flex-1 flex-col min-w-0 bg-[#fffaf4]"
              : "hidden md:flex flex-1 flex-col min-w-0 bg-[#fffaf4]"
          }
        >
          {selectedUser ? (
            <>
              {/* ==================================================
                  CHAT HEADER
              ================================================== */}

              <div
                className="
                  h-[78px]
                  flex-shrink-0
                  bg-[#fffdf9]
                  border-b
                  border-[#eadfd3]
                  flex
                  items-center
                  px-4
                  md:px-6
                  gap-3
                "
              >
                {/* MOBILE BACK */}

                <button
                  onClick={() => {
                    setSelectedConversation(
                      null
                    );

                    setMessages([]);
                  }}
                  className="
                    md:hidden
                    w-9
                    h-9
                    rounded-full
                    hover:bg-[#f4e9df]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ArrowLeft
                    size={20}
                  />
                </button>

                {/* IMAGE */}

                <div className="relative">
                  <img
                    src={getUserImage(
                      selectedUser
                    )}
                    alt={
                      selectedUser.name ||
                      selectedUser.username ||
                      "User"
                    }
                    className="
                      w-11
                      h-11
                      rounded-full
                      object-cover
                    "
                  />

                  {selectedUser.online && (
                    <span
                      className="
                        absolute
                        bottom-0
                        right-0
                        w-3
                        h-3
                        rounded-full
                        bg-[#56b870]
                        border-2
                        border-white
                      "
                    />
                  )}
                </div>

                {/* NAME */}

                <div className="flex-1">
                  <h2
                    className="
                      font-bold
                      text-[#302725]
                    "
                  >
                    {selectedUser.name ||
                      selectedUser.username}
                  </h2>

                  <p
                    className="
                      text-xs
                      text-[#58a968]
                    "
                  >
                    {selectedUser.online
                      ? "Online"
                      : "Online"}
                  </p>
                </div>

                {/* PHONE */}

                <button
                  className="
                    w-10
                    h-10
                    rounded-full
                    hover:bg-[#f4e9df]
                    flex
                    items-center
                    justify-center
                    text-[#5d514b]
                  "
                >
                  <Phone
                    size={19}
                  />
                </button>

                {/* VIDEO */}

                <button
                  className="
                    w-10
                    h-10
                    rounded-full
                    hover:bg-[#f4e9df]
                    flex
                    items-center
                    justify-center
                    text-[#5d514b]
                  "
                >
                  <Video
                    size={20}
                  />
                </button>
              </div>

              {/* ==================================================
                  MESSAGE AREA
              ================================================== */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  px-4
                  md:px-8
                  py-6
                "
              >
                <div
                  className="
                    max-w-3xl
                    mx-auto
                    space-y-4
                  "
                >
                  {loadingMessages ? (
                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        py-10
                        text-sm
                        text-[#8c7d74]
                      "
                    >
                      Loading messages...
                    </div>
                  ) : messages.length >
                    0 ? (
                    messages.map((msg) => {
                      // Sender can be populated object
                      // or just ObjectId/string
                      const senderId =
                        typeof msg.sender ===
                        "object"
                          ? msg.sender?._id
                          : msg.sender;

                      // IMPORTANT:
                      // Use currentUserId from backend.
                      // No localStorage needed.
                      const isMyMessage =
                        String(senderId) ===
                        String(currentUserId);

                      return (
                        <div
                          key={msg._id}
                          className={
                            isMyMessage
                              ? "flex items-end gap-2 justify-end"
                              : "flex items-end gap-2 justify-start"
                          }
                        >
                          {/* OTHER USER IMAGE */}

                          {!isMyMessage && (
                            <img
                              src={getUserImage(
                                selectedUser
                              )}
                              alt={
                                selectedUser.name ||
                                selectedUser.username ||
                                "User"
                              }
                              className="
                                w-8
                                h-8
                                rounded-full
                                object-cover
                                self-end
                              "
                            />
                          )}

                          {/* MESSAGE */}

                          <div
                            className={
                              isMyMessage
                                ? "max-w-[75%] md:max-w-[60%] px-4 py-3 text-sm leading-relaxed bg-[#f6dfc5] text-[#4a342b] rounded-2xl rounded-br-md"
                                : "max-w-[75%] md:max-w-[60%] px-4 py-3 text-sm leading-relaxed bg-white border border-[#eee2d8] text-[#433734] rounded-2xl rounded-bl-md shadow-sm"
                            }
                          >
                            <div>
                              {msg.text}
                            </div>

                            <div
                              className={
                                isMyMessage
                                  ? "text-[10px] mt-1 text-right text-[#927765]"
                                  : "text-[10px] mt-1 text-right text-[#a09389]"
                              }
                            >
                              {formatTime(
                                msg.createdAt
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        py-16
                        text-center
                      "
                    >
                      <div className="text-5xl mb-3">
                        👋
                      </div>

                      <h3
                        className="
                          font-semibold
                          text-[#403431]
                        "
                      >
                        Start the conversation
                      </h3>

                      <p
                        className="
                          text-sm
                          text-[#8c7d74]
                          mt-1
                        "
                      >
                        Say hello to{" "}
                        {selectedUser.name ||
                          selectedUser.username}
                      </p>
                    </div>
                  )}

                  {/* AUTO SCROLL TARGET */}

                  <div
                    ref={messagesEndRef}
                  />
                </div>
              </div>

              {/* ==================================================
                  MESSAGE INPUT
              ================================================== */}

              <div
                className="
                  flex-shrink-0
                  bg-[#fffdf9]
                  border-t
                  border-[#eadfd3]
                  px-4
                  md:px-6
                  py-4
                "
              >
                <div
                  className="
                    max-w-3xl
                    mx-auto
                    flex
                    items-center
                    gap-2
                  "
                >
                  {/* EMOJI */}

                  <button
                    className="
                      flex-shrink-0
                      w-10
                      h-10
                      rounded-full
                      hover:bg-[#f4e9df]
                      flex
                      items-center
                      justify-center
                      text-[#806f65]
                    "
                  >
                    <Smile
                      size={21}
                    />
                  </button>

                  {/* INPUT */}

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value
                      )
                    }
                    onKeyDown={
                      handleKeyDown
                    }
                    placeholder="Type a message..."
                    disabled={sending}
                    className="
                      flex-1
                      h-11
                      rounded-full
                      bg-[#f8f1ea]
                      border
                      border-[#eadfd3]
                      px-5
                      outline-none
                      text-sm
                      text-[#3c302d]
                      placeholder:text-[#a4968c]
                      focus:border-[#b76b75]
                      transition
                      disabled:opacity-60
                    "
                  />

                  {/* SEND */}

                  <button
                    onClick={
                      sendMessage
                    }
                    disabled={
                      !message.trim() ||
                      sending
                    }
                    className="
                      flex-shrink-0
                      w-11
                      h-11
                      rounded-full
                      bg-[#8e2940]
                      text-white
                      flex
                      items-center
                      justify-center
                      shadow-sm
                      hover:bg-[#792236]
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <Send
                      size={19}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* ==================================================
               NO CONVERSATION SELECTED
            ================================================== */

            <div
              className="
                flex
                flex-1
                items-center
                justify-center
                text-center
              "
            >
              <div>
                <div className="text-6xl mb-4">
                  💬
                </div>

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-[#403431]
                  "
                >
                  Select a match
                </h2>

                <p
                  className="
                    text-[#8c7d74]
                    mt-2
                  "
                >
                  Start a conversation with
                  your Garba match
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}