Express was not informed how to parse incoming data.
In order to tell server to parse data as Json we have to add header to curl request:
"Content-Type: application/json" 
Correct command for this case is:

curl -X POST --data '["Bees"]' -H "Content-Type: application/json" -H "X-Username: Ahmed" -H "X-Password: ahmed-pass" http://localhost:3000

simple authentication added, X-Password now combined to registered usernames:
const registeredUsers = {
    "Ahmed": "ahmed-pass",
    "Emma": "emma-pass"
}

