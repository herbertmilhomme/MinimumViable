using UnityEngine;
using System.Collections;

public class boatMovement : MonoBehaviour
{
    
    //set up the fields
    private float speed = 10.0f;
    private float rotationspeed=20.0f;
    private float accel = 0.2f;
    private float decel = 0.15f;
    private float maxSpeed = 20.0f;
    private float minSpeed = 0.0f;



    // Use this for initialization
    // Update is called once per frame
    void Update()
    {

            if (speed > maxSpeed)
                speed = maxSpeed;
            if (speed < minSpeed)
                speed = minSpeed;
    
        // Forward movement
        if (Input.GetKey(KeyCode.W))
        { 
            speed += accel;
            transform.Translate(Vector3.down * speed * Time.deltaTime);
            
        }
        // Backward movement
        if (Input.GetKey(KeyCode.A))
        {
            
            transform.Rotate(Vector3.forward * rotationspeed * Time.deltaTime);
        }
        
        // Left movement
         if (Input.GetKey(KeyCode.S))
        {
            speed += accel;
            transform.Translate(Vector3.up * speed * Time.deltaTime);

        }
        // Right movement
        if (Input.GetKey(KeyCode.D))
        {
            
            transform.Rotate(Vector3.back * rotationspeed * Time.deltaTime);
        }
        
     
            speed -= decel;
        



	}

}