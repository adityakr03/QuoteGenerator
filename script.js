const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
     quoteContainer.hidden = false;
     loader.hidden = true;
}

// show new quote

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    const author = quote.author.split(',')[0]; // Split author's name at the comma and take the first part
    authorText.textContent = "~ " + author.trim(); // Trim any leading or trailing spaces
    quoteText.textContent = quote.text;
    complete();
}


// get quotes from API
async function getQuotes(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        console.log(error);
    }
}

// Function to share quote on WhatsApp status
function tweetQuote() {
    const text = encodeURIComponent(`${quoteText.textContent} - ${authorText.textContent}`);
    const whatsappUrl = `https://wa.me/?text=${text}`;
    window.open(whatsappUrl, '_blank');
}

// event listener
newQuoteBtn.addEventListener('click', newQuote);
// Event listener for sharing on WhatsApp
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();