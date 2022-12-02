# Welcome to Vigenere forum

## Idea
This app creates a simple chat webpage, which is completely open to any visitor to view and post to.

A visitor can open a channel and send messages in that channel. 
The gimmic is this: the visitor can choose any password. All messages will be encrypted and decrypted with that password, using Vigenere encryption. An 'incorrect' password simply results in unreadable text. Encrypting and decrypting all happens client-side, so messages are actually stored on the server in encrypted form.

Within one channel, people can use different passwords as they wish, thus creating a sort of subchannel.

## How to install
Make sure the javascript npm packages are installed in the **js** folder.

To run a server instance, you could execute **CompileAndStart.sh** with bash. Make sure you have sqlite3 installed as well as php.

## Disclaimers
This app is very basic and does not have any security measures in place, like user authentication, security headers or bot-prevention. Furthermore, the Vigenere encryption method is not regarded as a good encryption method; statistical procedures exist by which it can be broken.