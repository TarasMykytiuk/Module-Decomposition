simple authentication added, X-Password now combined to registered usernames:
const registeredUsers = {
    "Ahmed": "ahmed-pass",
    "Emma": "emma-pass"
}
Example of request:
curl -X POST --data '["Bees"]' -H "X-Username: Ahmed" -H "X-Password: ahmed-pass" http://localhost:3000