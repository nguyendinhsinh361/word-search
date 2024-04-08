import axios from 'axios';

export function test(){
    console.log(111)
}

const TOKEN = ""
var data = JSON.stringify({
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "Does this word have a meaning in the English dictionary?"
    },
    {
      "role": "user",
      "content": "Word: `Hello`"
    }
  ],
  "temperature": 0
});

var config = {
  method: 'POST',
  url: 'https://api.openai.com/v1/chat/completions',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${TOKEN}`, 
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
