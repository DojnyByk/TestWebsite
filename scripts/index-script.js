document.getElementById("message-submit-btn").addEventListener("click", (event) => {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var body = "Message from " + name + ": " + message;
    var mail = "mailto:dojnybyk@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = mail;
});