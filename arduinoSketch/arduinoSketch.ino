
  int red = 11;
  int blue = 10;
  int green = 9;
void setup() {
  // put your setup code here, to run once:

  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(blue, OUTPUT);
  Serial.begin(9600);
}
int r,g,b;
int cycleLen = 256;//microseconds
char color[7] = {"FFFFFF"};

void writeHex(char color[]){
  char redHex[3];
  char greenHex[3];
  char blueHex[3];
  redHex[0]=color[0];
  redHex[1]=color[1];
  greenHex[0]=color[2];
  greenHex[1]=color[3];
  blueHex[0]=color[4];
  blueHex[1]=color[5];
  redHex[2]='\0';
  greenHex[2]='\0';
  blueHex[2]='\0';
  
  r = (int)strtol(redHex, NULL, 16);
  g = (int)strtol(greenHex, NULL, 16);
  b = (int)strtol(blueHex, NULL, 16);

//  Serial.print("r: "+String(r)+" "+redHex);
//  Serial.print(" g: "+String(g)+" "+greenHex);
//  Serial.println(" b: "+String(b)+" "+blueHex);
  }

  void displayColor(){

    long int micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(red, r);}
    micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(green, g);}
    micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(blue, b*2/3);}
  }

void loop() {
  if (Serial.available() >= 6 ) {
                for(int c = 0; c < 6; c++){
                  color[c] = Serial.read();  
                }
                while(Serial.available())Serial.read();
                writeHex(color);
        }  
  displayColor();
}
