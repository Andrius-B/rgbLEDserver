import serial
import sys
import string



def read_in():
    """reads 6 chars from stdin"""
    hexColor = sys.stdin.read(6)
    return hexColor

def clear_in():
    """this is an imporvised way to clear stdin
    implied \n termination of input"""
    c = sys.stdin.read(1)
    while(c!='\n'):
        c = sys.stdin.read(1)

def char_range(c1, c2):
    """Generates the character list from `c1` to `c2`, inclusive."""
    for c in range(ord(c1), ord(c2)+1):
        yield chr(c)

def main():
    portName = '/dev/tty/S2'
    """This /dev/tty naming convention is used on linux,
    though on Windows serial ports are named COM*,
    though I am running this from an Ubuntu VM on a Windows machine, so I use /dev/tty
    and have routed it through my VMware to my physical computer"""
    
    sys.stdout.write("Openning serial with name "+portName+"\n")
    sys.stdout.write("Change this in this files' (sendHex.py) src")
    sys.stdout.flush()
    ser = serial.Serial(portName, 9600)
    sys.stdout.write("waiting for input\n")
    sys.stdout.flush()
    try:
        while 1:
            line = read_in()
            clear_in()
            for c in line:
                if c not in string.hexdigits:
                    print("bad hex read")
                    sys.stdout.flush()
                    break
            print("writing hex: "+"\033[1m"+line+'\033[0m') #bold characters
            sys.stdout.flush()
            ser.write(bytes(line, 'utf-8'))
            line = ""
            sys.stdout.flush()
    except KeyboardInterrupt:
        sys.stdout.write("quitting..\n")
        sys.stdout.flush()
        ser.close();
        exit()

if __name__ == '__main__':
    main()
    ser.close()
