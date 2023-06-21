#include <Servo.h>

Servo servo;

void setup()
{
    pinMode(LED_BUILTIN, OUTPUT);
    servo.attach(3);
    Serial.begin(9600);
    servo.write(0);
}

void loop()
{
    if (Serial.available() > 0)
    {
        char state = Serial.read();
        if (state == '1')
        {
            servo.write(90);
            digitalWrite(LED_BUILTIN, HIGH);
            Serial.println("LED ligado");
        }
        else if (state == '2')
        {
            servo.write(0);
            digitalWrite(LED_BUILTIN, LOW);
            Serial.println("LED desligado");
        }
    }
}