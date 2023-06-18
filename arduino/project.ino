int ledPin = 13;

void setup()
{
    pinMode(ledPin, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    if (Serial.available() > 0)
    {
        char state = Serial.read();
        if (state == '1')
        {
            digitalWrite(ledPin, HIGH);
            Serial.println("LED ligado");
        }
        else if (state == '2')
        {
            digitalWrite(ledPin, LOW);
            Serial.println("LED desligado");
        }
    }
}