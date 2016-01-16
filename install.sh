


Copy your service file into the /etc/systemd/system directory. Then make systemd aware of the new service:


systemctl daemon-reload







Start the service:


systemctl start myapp
