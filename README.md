

## AWS EC2 instance
### How to redirect port 8080 to 80
```bash
sudo iptables -t nat -L
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080 # 8080 -> 8080
```