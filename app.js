const firebaseConfig = {
    apiKey: "AIzaSyDKbsD-n_2pegTi6pCyh5fOIRkP0wsNhX0",
    authDomain: "xsocial-14f3d.firebaseapp.com",
    projectId: "xsocial-14f3d",
    storageBucket: "xsocial-14f3d.firebasestorage.app",
    messagingSenderId: "367367942169",
    appId: "1:367367942169:web:c24a39eb2b7136ed4ffa88"
};

const cloudinaryConfig = {
    cloudName: "dsjvlrxdr",
    uploadPreset: "neloreod"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;
let userData = null;
let currentChatId = null;
let unreadMessages = new Set();

auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        const userDoc = await db.collection('users').doc(user.uid).get();
        userData = userDoc.data();
        initApp();
        checkUnreadMessages();
        // Set up real-time listener for new messages
        setupMessageListeners();
    } else if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
});

function setupMessageListeners() {
    if (!currentUser) return;
    
    // Listen for all chats where user is a participant
    db.collection('chats')
        .where('users', 'array-contains', currentUser.uid)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'modified') {
                    const chatData = change.doc.data();
                    const lastMessage = chatData.lastMessage;
                    
                    // If last message exists and is not from current user, and chat is not active
                    if (lastMessage && lastMessage.senderId !== currentUser.uid && 
                        (!currentChatId || currentChatId !== change.doc.id)) {
                        unreadMessages.add(change.doc.id);
                        updateMessageBadge();
                    }
                }
            });
        });
}

function checkUnreadMessages() {
    if (!currentUser) return;
    
    db.collection('chats')
        .where('users', 'array-contains', currentUser.uid)
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                const chatData = doc.data();
                if (chatData.lastMessage && chatData.lastMessage.senderId !== currentUser.uid) {
                    unreadMessages.add(doc.id);
                }
            });
            updateMessageBadge();
        });
}

function updateMessageBadge() {
    const msgIcon = document.querySelector('.fa-envelope');
    if (msgIcon) {
        if (unreadMessages.size > 0) {
            // Remove existing badge if any
            let badge = msgIcon.querySelector('.message-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'message-badge';
                badge.style.cssText = 'position:absolute; top:-5px; right:-5px; background:var(--red); color:white; border-radius:50%; width:18px; height:18px; font-size:10px; display:flex; align-items:center; justify-content:center;';
                msgIcon.style.position = 'relative';
                msgIcon.appendChild(badge);
            }
            badge.textContent = unreadMessages.size > 9 ? '9+' : unreadMessages.size;
        } else {
            const badge = msgIcon.querySelector('.message-badge');
            if (badge) badge.remove();
        }
    }
}

function initApp() {
    const params = new URLSearchParams(window.location.search);
    const profileUser = params.get('u');
    const searchQuery = params.get('q');

    if (window.location.pathname.includes('settings.html')) {
        loadSettings();
    } else if (profileUser) {
        showProfile(profileUser);
    } else if (window.location.pathname.includes('search_results.html')) {
        runSearch(searchQuery);
    } else if (window.location.pathname.includes('chat.html')) {
        loadInbox();
    } else {
        loadFeed();
    }
}

async function handleAuth() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    const isLogin = document.getElementById('auth-btn').innerText === 'Log In';

    try {
        if (isLogin) {
            await auth.signInWithEmailAndPassword(email, pass);
            window.location.href = 'index.html';
        } else {
            const username = document.getElementById('reg-username').value.toLowerCase();
            const name = document.getElementById('reg-name').value;
            
            const check = await db.collection('users').where('username', '==', username).get();
            if (!check.empty) return alert("Username taken!");

            const res = await auth.createUserWithEmailAndPassword(email, pass);
            await db.collection('users').doc(res.user.uid).set({
                uid: res.user.uid,
                username: username,
                name: name,
                isVerified: false,
                bio: "Digital Nomad",
                profilePic: "",
                messageRequests: []
            });
            window.location.href = 'index.html';
        }
    } catch (e) { alert(e.message); }
}

const regUserInp = document.getElementById('reg-username');
if (regUserInp) {
    regUserInp.addEventListener('input', async (e) => {
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        e.target.value = val;
        const status = document.getElementById('username-status');
        if (val.length < 3) { status.innerHTML = ""; return; }
        const snap = await db.collection('users').where('username', '==', val).get();
        if (!snap.empty) {
            status.innerHTML = `<span class="taken">Username ${val} is taken</span>`;
        } else {
            status.innerHTML = `<span class="available">${val} is available <i class="fas fa-check-circle"></i></span>`;
        }
    });
}

// Setup search functionality
const searchInput = document.getElementById('global-search');
if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search_results.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

function previewFile() {
    const fileInput = document.getElementById('img-upload') || document.getElementById('img-file') || document.getElementById('profile-pic-input');
    const preview = document.getElementById('post-preview') || document.getElementById('image-preview') || document.getElementById('profile-pic-preview');
    if (fileInput && preview) {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => { 
                preview.src = e.target.result; 
                preview.style.display = 'block'; 
            };
            reader.readAsDataURL(file);
        }
    }
}

async function submitPost() {
    const text = document.getElementById('post-input').value;
    const file = document.getElementById('img-file').files[0];
    if (!text && !file) return;

    let imgUrl = null;
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        });
        const cloudData = await response.json();
        imgUrl = cloudData.secure_url;
    }

    await db.collection('posts').add({
        text: text,
        imageUrl: imgUrl,
        uid: currentUser.uid,
        username: userData.username,
        name: userData.name,
        isVerified: userData.isVerified,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: [],
        comments: []
    });
    
    document.getElementById('post-modal').classList.remove('active');
    document.getElementById('post-input').value = '';
    document.getElementById('img-file').value = '';
    document.getElementById('post-preview').style.display = 'none';
    loadFeed();
}

function loadFeed() {
    const feed = document.getElementById('feed');
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snap => {
        feed.innerHTML = '';
        snap.forEach(doc => renderPost(doc, feed));
    });
}

async function showProfile(username) {
    // If viewing own profile, redirect to settings
    if (username === userData.username) {
        window.location.href = 'settings.html';
        return;
    }
    
    const view = document.getElementById('profile-view');
    const feed = document.getElementById('feed');
    view.style.display = 'block';
    const snap = await db.collection('users').where('username', '==', username).get();
    if (snap.empty) return;
    const u = snap.docs[0].data();
    
    document.getElementById('p-username').innerText = `@${u.username}`;
    document.getElementById('p-name').innerText = u.name;
    if (u.isVerified) {
        document.getElementById('p-name').innerHTML += ' <i class="fas fa-check-circle" style="color:#1d9bf0"></i>';
    }
    
    // Check message request status
    const msgBtn = document.getElementById('msg-req-btn');
    if (u.uid !== currentUser.uid) {
        msgBtn.style.display = 'block';
        
        // Check if request already sent
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        const currentUserData = userDoc.data();
        const hasRequest = currentUserData.messageRequests && 
                          currentUserData.messageRequests.some(req => req.to === u.uid && req.status === 'pending');
        
        if (hasRequest) {
            msgBtn.innerHTML = 'Request Sent';
            msgBtn.disabled = true;
        } else {
            msgBtn.innerHTML = 'Message Request';
            msgBtn.onclick = () => sendMessageRequest(u.uid, u.username);
            msgBtn.disabled = false;
        }
    } else {
        msgBtn.style.display = 'none';
    }
    
    db.collection('posts').where('username', '==', username).onSnapshot(snap => {
        feed.innerHTML = '';
        snap.forEach(doc => renderPost(doc, feed));
    });
}

async function sendMessageRequest(targetUid, targetUsername) {
    try {
        // Add to sender's messageRequests
        await db.collection('users').doc(currentUser.uid).update({
            messageRequests: firebase.firestore.FieldValue.arrayUnion({
                to: targetUid,
                username: targetUsername,
                status: 'pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        });
        
        // Add to receiver's messageRequests
        await db.collection('users').doc(targetUid).update({
            messageRequests: firebase.firestore.FieldValue.arrayUnion({
                from: currentUser.uid,
                username: userData.username,
                status: 'pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        });
        
        alert('Message request sent!');
        location.reload();
    } catch (error) {
        alert('Error sending request: ' + error.message);
    }
}

function renderPost(doc, container) {
    const data = doc.data();
    const isLiked = data.likes && data.likes.includes(currentUser.uid);
    
    // Format timestamp
    const timeAgo = formatTimeAgo(data.timestamp?.toDate());
    
    const postElement = document.createElement('div');
    postElement.className = 'post-card';
    postElement.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div>
                <span style="font-weight:700; cursor:pointer;" onclick="${data.uid === currentUser.uid ? 'window.location.href=\'settings.html\'' : `window.location.href='index.html?u=${data.username}'`}">
                    ${data.name} ${data.isVerified ? '<i class="fas fa-check-circle" style="color:#1d9bf0"></i>' : ''}
                </span>
                <div style="color: var(--sec); font-size: 0.9rem; margin-top: 2px;">
                    @${data.username} · ${timeAgo}
                </div>
            </div>
            ${data.uid === currentUser.uid ? '<i class="fas fa-ellipsis-h" style="cursor:pointer; color:var(--sec)"></i>' : ''}
        </div>
        <div class="post-text">${data.text}</div>
        ${data.imageUrl ? `<img src="${data.imageUrl}" class="post-image">` : ''}
        <div style="margin-top:12px; display:flex; gap:20px; color:#a0a0a0">
            <div style="display:flex; align-items:center; gap:5px;">
                <i class="fa${isLiked ? 's' : 'r'} fa-heart" style="${isLiked ? 'color:#ff0033' : ''}" onclick="toggleLike('${doc.id}', ${isLiked})"></i>
                <span>${data.likes ? data.likes.length : 0}</span>
            </div>
            <div style="display:flex; align-items:center; gap:5px;">
                <i class="far fa-comment" onclick="toggleComments('${doc.id}')"></i>
                <span>${data.comments ? data.comments.length : 0}</span>
            </div>
        </div>
        <div id="comments-${doc.id}" class="comments-section" style="display:none; margin-top:15px; border-top:1px solid var(--border); padding-top:10px;">
            <div id="comments-list-${doc.id}"></div>
            <div style="display:flex; margin-top:10px;">
                <input type="text" id="comment-input-${doc.id}" placeholder="Add a comment..." style="flex:1; background:var(--surf); border:1px solid var(--border); border-radius:20px; padding:8px 15px; color:white; outline:none;">
                <button onclick="addComment('${doc.id}')" style="background:none; border:none; color:var(--red); margin-left:10px;">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    container.appendChild(postElement);
    
    // Load comments if any
    if (data.comments && data.comments.length > 0) {
        loadComments(doc.id, data.comments);
    }
}

function formatTimeAgo(date) {
    if (!date) return '';
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + 'y';
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + 'mo';
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + 'd';
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + 'h';
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + 'm';
    
    return 'Just now';
}

async function toggleLike(postId, isLiked) {
    const ref = db.collection('posts').doc(postId);
    if (isLiked) {
        await ref.update({ likes: firebase.firestore.FieldValue.arrayRemove(currentUser.uid) });
    } else {
        await ref.update({ likes: firebase.firestore.FieldValue.arrayUnion(currentUser.uid) });
    }
}

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection.style.display === 'none') {
        commentsSection.style.display = 'block';
    } else {
        commentsSection.style.display = 'none';
    }
}

async function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();
    if (!commentText) return;
    
    const comment = {
        uid: currentUser.uid,
        username: userData.username,
        name: userData.name,
        text: commentText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    await db.collection('posts').doc(postId).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
    });
    
    input.value = '';
    
    // Refresh comments
    const postDoc = await db.collection('posts').doc(postId).get();
    const comments = postDoc.data().comments || [];
    loadComments(postId, comments);
}

function loadComments(postId, comments) {
    const commentsList = document.getElementById(`comments-list-${postId}`);
    commentsList.innerHTML = '';
    
    // Sort comments by timestamp
    comments.sort((a, b) => {
        const timeA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
        const timeB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
        return timeA - timeB;
    });
    
    comments.forEach(comment => {
        const timeAgo = formatTimeAgo(comment.timestamp?.toDate ? comment.timestamp.toDate() : new Date(comment.timestamp));
        commentsList.innerHTML += `
            <div style="margin-bottom: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                <div style="font-weight: 600; font-size: 0.9rem;">
                    ${comment.name} <span style="color: var(--sec); font-size: 0.8rem;">@${comment.username} · ${timeAgo}</span>
                </div>
                <div style="font-size: 0.9rem; margin-top: 2px;">${comment.text}</div>
            </div>
        `;
    });
}

function runSearch(query) {
    if (!query) return;
    db.collection('users').where('username', '>=', query.toLowerCase())
      .where('username', '<=', query.toLowerCase() + '\uf8ff')
      .get().then(snap => {
        const container = document.getElementById('results-container');
        container.innerHTML = '';
        if (snap.empty) {
            container.innerHTML = '<p style="text-align:center; color:var(--sec);">No users found</p>';
            return;
        }
        snap.forEach(doc => {
            const u = doc.data();
            container.innerHTML += `
                <div class="user-card" onclick="location.href='index.html?u=${u.username}'">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="user-pic"></div>
                        <div>
                            <div style="font-weight:700">${u.name} ${u.isVerified ? '<i class="fas fa-check-circle" style="color:#1d9bf0"></i>' : ''}</div>
                            <div style="color:var(--sec); font-size:0.9rem;">@${u.username}</div>
                        </div>
                    </div>
                    <button class="follow-btn">View</button>
                </div>`;
        });
    });
}

async function loadInbox() {
    const container = document.getElementById('inbox');
    const params = new URLSearchParams(window.location.search);
    const target = params.get('target');
    const name = params.get('name');
    
    if (target) {
        openChat(target, name);
    }
    
    // Listen for chats
    db.collection('chats')
        .where('users', 'array-contains', currentUser.uid)
        .orderBy('lastUpdated', 'desc')
        .onSnapshot(snap => {
            container.innerHTML = '';
            snap.forEach(doc => {
                const data = doc.data();
                const otherUserIndex = data.users.findIndex(id => id !== currentUser.uid);
                const otherUserId = data.users[otherUserIndex];
                const otherUsername = data.usernames[otherUserIndex];
                
                // Format last message
                let lastMessageText = 'No messages yet';
                let lastMessageSender = '';
                
                if (data.lastMessage) {
                    if (data.lastMessage.text.length > 30) {
                        lastMessageText = data.lastMessage.text.substring(0, 30) + '...';
                    } else {
                        lastMessageText = data.lastMessage.text;
                    }
                    
                    if (data.lastMessage.senderId === currentUser.uid) {
                        lastMessageSender = 'You: ';
                    }
                }
                
                container.innerHTML += `
                    <div class="chat-item" onclick="openChat('${otherUserId}', '${otherUsername}')">
                        <div class="user-pic-small"></div>
                        <div style="flex:1;">
                            <div style="font-weight:600; margin-bottom:4px;">
                                @${otherUsername}
                                ${unreadMessages.has(doc.id) ? '<span class="unread-indicator"></span>' : ''}
                            </div>
                            <div style="color:var(--sec); font-size:0.9rem;">
                                ${lastMessageSender}${lastMessageText}
                            </div>
                        </div>
                    </div>`;
            });
        });
}

async function openChat(targetUid, targetName) {
    // Mark as read when opening
    unreadMessages.delete(currentChatId);
    updateMessageBadge();
    
    document.getElementById('active-chat').style.display = 'flex';
    document.getElementById('chat-user-name').innerText = `@${targetName}`;
    
    // Create or get chat ID
    currentChatId = [currentUser.uid, targetUid].sort().join('_');
    
    // Check if message request is accepted
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();
    const messageRequests = userData.messageRequests || [];
    
    const request = messageRequests.find(req => 
        (req.to === targetUid || req.from === targetUid) && req.status === 'accepted'
    );
    
    const canMessage = request || targetUid === currentUser.uid;
    
    // Update chat UI based on permission
    const msgInput = document.getElementById('msg-input');
    const sendBtn = document.querySelector('.chat-input-area button');
    
    if (!canMessage) {
        msgInput.placeholder = "Send a message request first";
        msgInput.disabled = true;
        sendBtn.disabled = true;
        sendBtn.style.color = 'var(--sec)';
    } else {
        msgInput.placeholder = "Start a message";
        msgInput.disabled = false;
        sendBtn.disabled = false;
        sendBtn.style.color = 'var(--red)';
    }
    
    // Create/update chat document
    await db.collection('chats').doc(currentChatId).set({
        users: [currentUser.uid, targetUid],
        usernames: [userData.username, targetName],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    // Load messages
    db.collection('chats').doc(currentChatId).collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snap => {
        const flow = document.getElementById('messages-flow');
        flow.innerHTML = '';
        snap.forEach(doc => {
            const m = doc.data();
            const side = m.senderId === currentUser.uid ? 'sent' : 'received';
            const time = formatTimeAgo(m.timestamp?.toDate());
            flow.innerHTML += `
                <div class="msg ${side}">
                    <div>${m.text}</div>
                    <div style="font-size:0.7rem; opacity:0.7; text-align:${side === 'sent' ? 'right' : 'left'}; margin-top:3px;">
                        ${time}
                    </div>
                </div>`;
        });
        flow.scrollTop = flow.scrollHeight;
        
        // Update last message
        if (!snap.empty) {
            const lastMsg = snap.docs[snap.docs.length - 1].data();
            db.collection('chats').doc(currentChatId).update({
                lastMessage: {
                    text: lastMsg.text,
                    senderId: lastMsg.senderId,
                    timestamp: lastMsg.timestamp
                },
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    });
}

function closeChat() {
    document.getElementById('active-chat').style.display = 'none';
    currentChatId = null;
    // Go back to chat list
    window.history.pushState({}, '', 'chat.html');
}

async function sendMessage() {
    const inp = document.getElementById('msg-input');
    const text = inp.value.trim();
    if (!text || !currentChatId) return;
    
    // Check if can send message
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();
    const chatDoc = await db.collection('chats').doc(currentChatId).get();
    const chatData = chatDoc.data();
    
    const otherUserId = chatData.users.find(id => id !== currentUser.uid);
    const messageRequests = userData.messageRequests || [];
    const request = messageRequests.find(req => 
        (req.to === otherUserId || req.from === otherUserId) && req.status === 'accepted'
    );
    
    // Count existing messages from current user in this chat
    const messagesSnap = await db.collection('chats').doc(currentChatId)
        .collection('messages')
        .where('senderId', '==', currentUser.uid)
        .get();
    
    if (!request && messagesSnap.size >= 1 && otherUserId !== currentUser.uid) {
        alert('You can only send 1 message until your request is accepted');
        return;
    }
    
    // Send message
    await db.collection('chats').doc(currentChatId).collection('messages').add({
        text: text,
        senderId: currentUser.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    inp.value = '';
}

async function loadSettings() {
    if (!currentUser || !userData) return;
    
    const settingsView = document.getElementById('settings-view');
    if (settingsView) {
        settingsView.style.display = 'block';
        
        // Load user data into form
        document.getElementById('settings-name').value = userData.name || '';
        document.getElementById('settings-username').value = userData.username || '';
        document.getElementById('settings-bio').value = userData.bio || '';
        
        // Load profile picture if exists
        if (userData.profilePic) {
            document.getElementById('profile-pic-preview').src = userData.profilePic;
            document.getElementById('profile-pic-preview').style.display = 'block';
        }
        
        // Load message requests
        loadMessageRequests();
    }
}

async function saveSettings() {
    const name = document.getElementById('settings-name').value;
    const username = document.getElementById('settings-username').value.toLowerCase();
    const bio = document.getElementById('settings-bio').value;
    const file = document.getElementById('profile-pic-input').files[0];
    
    // Check if username is available (if changed)
    if (username !== userData.username) {
        const check = await db.collection('users').where('username', '==', username).get();
        if (!check.empty) {
            alert("Username is taken!");
            return;
        }
    }
    
    let profilePicUrl = userData.profilePic;
    
    // Upload new profile picture if selected
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const cloudData = await response.json();
            profilePicUrl = cloudData.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    
    // Update user data
    await db.collection('users').doc(currentUser.uid).update({
        name: name,
        username: username,
        bio: bio,
        profilePic: profilePicUrl
    });
    
    // Update all posts with new name
    const postsSnapshot = await db.collection('posts')
        .where('uid', '==', currentUser.uid)
        .get();
    
    const batch = db.batch();
    postsSnapshot.forEach(doc => {
        batch.update(doc.ref, { 
            name: name,
            username: username 
        });
    });
    
    await batch.commit();
    
    alert('Settings saved!');
    location.reload();
}

async function loadMessageRequests() {
    const requestsList = document.getElementById('message-requests-list');
    if (!requestsList) return;
    
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();
    const requests = userData.messageRequests || [];
    
    requestsList.innerHTML = '';
    
    requests.forEach(async (request, index) => {
        if (request.status === 'pending' && request.from) {
            const fromUserDoc = await db.collection('users').doc(request.from).get();
            const fromUser = fromUserDoc.data();
            
            requestsList.innerHTML += `
                <div class="request-item">
                    <div>
                        <strong>@${fromUser.username}</strong> wants to message you
                    </div>
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button onclick="handleMessageRequest('${request.from}', 'accept')" class="accept-btn">Accept</button>
                        <button onclick="handleMessageRequest('${request.from}', 'decline')" class="decline-btn">Decline</button>
                    </div>
                </div>
            `;
        }
    });
}

async function handleMessageRequest(fromUserId, action) {
    // Update current user's requests
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    const userData = userDoc.data();
    const requests = userData.messageRequests || [];
    
    const updatedRequests = requests.map(req => {
        if (req.from === fromUserId) {
            return { ...req, status: action === 'accept' ? 'accepted' : 'declined' };
        }
        return req;
    });
    
    await db.collection('users').doc(currentUser.uid).update({
        messageRequests: updatedRequests
    });
    
    // Update sender's requests
    const fromUserDoc = await db.collection('users').doc(fromUserId).get();
    const fromUserData = fromUserDoc.data();
    const fromRequests = fromUserData.messageRequests || [];
    
    const updatedFromRequests = fromRequests.map(req => {
        if (req.to === currentUser.uid) {
            return { ...req, status: action === 'accept' ? 'accepted' : 'declined' };
        }
        return req;
    });
    
    await db.collection('users').doc(fromUserId).update({
        messageRequests: updatedFromRequests
    });
    
    alert(`Message request ${action}ed!`);
    loadMessageRequests();
}

function openPostModal() { 
    document.getElementById('post-modal').classList.add('active'); 
}

function toggleAuth() {
    const sf = document.getElementById('signup-fields');
    const btn = document.getElementById('auth-btn');
    const link = document.querySelector('.toggle-link');
    if (sf.style.display === 'none') {
        sf.style.display = 'block';
        btn.innerText = 'Sign Up';
        link.innerText = 'Already have an account? Log In';
    } else {
        sf.style.display = 'none';
        btn.innerText = 'Log In';
        link.innerText = "Don't have an account? Sign Up";
    }
}

// Initialize file input listeners
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = ['img-file', 'img-upload', 'profile-pic-input'];
    fileInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', previewFile);
        }
    });
});