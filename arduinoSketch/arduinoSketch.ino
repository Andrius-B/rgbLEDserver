
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
int rCurr, gCurr, bCurr;
int rDiff, gDiff, bDiff;
int transitionDuration = 500;//ms
int changeBeg;
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
  
  
  rCurr = r;
  rDiff = (int)strtol(redHex, NULL, 16) - rCurr;

  gCurr = g;
  gDiff = (int)strtol(greenHex, NULL, 16) - gCurr;
  
  bCurr = b;
  bDiff = (int)strtol(blueHex, NULL, 16) - bCurr;
  
  changeBeg = millis();
  
  }
  
void converge(int *r,int *g, int *b){
  int timePassed = millis() - changeBeg;
  float scale = max(-0.1,min(1.f,timePassed/(float)transitionDuration));
  if(!(scale<0 || scale == 1)){
  Serial.print(rDiff*scale+(float)rCurr);Serial.print(" : ");Serial.print(rCurr);Serial.print(" : ");Serial.println(*r);
  *r = (float)rCurr + rDiff*scale;
  *g = (float)gCurr + gDiff*scale;
  *b = (float)bCurr + bDiff*scale;
  }
}


  void displayColor(){
    converge(&r,&g,&b);
    long int micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(red, r);}
    micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(green, g);}
    micr = micros();
    while(micros()-micr < cycleLen/3.f){analogWrite(blue, b*2/3);} //white balance for my LED
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
