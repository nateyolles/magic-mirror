# magic-mirror
Webserver for my Raspberry Pi based smart mirror video player

## Hide boot text

### Works
Follow instructions from https://raspberrypi.stackexchange.com/questions/106070/how-to-clear-the-screen-and-auto-mount-device-on-startup.

```
sudo sh -c "TERM=linux setterm -foreground black -clear all >/dev/tty0"
```
This works from the command line. TODO: create the service as described in the answer above.

### See also
`sudo vim /boot/firmware/cmdline.txt`
Change tty1 to tty3

`sudo nano /etc/rc.local` and add
```
#Suppress Kernel Messages
dmesg --console-off
```

See: https://raspberrypi.stackexchange.com/a/59311

See: https://techoverflow.net/2021/10/19/how-to-hide-all-boot-text-blinking-cursor-on-raspberry-pi/
https://blog.smittytone.net/2020/05/23/how-to-remove-a-pis-login-message/
