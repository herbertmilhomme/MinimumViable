#pragma strict

var target : Transform;
var distance = 1.0;
var height = 1.0;
//   var align = 1.0;
var heightDamping = 3.0;
var rotationDamping = 3.0;
//var alignDamping = 3.0;
//@script AddComponentMenu("Camera-Control/Smooth Follow")

function LateUpdate () 
{
	if (!target)
		return;
		
	var wantedRotationAngle = target.eulerAngles.y;
	var wantedHeight = target.position.y + height;
	//var wantedAlign = target.position.z + align;
		
	var currentRotationAngle = transform.eulerAngles.y;
	var currentHeight = transform.position.y;
	//var currentAlign = transform.position.z;
	
	currentRotationAngle = Mathf.LerpAngle (currentRotationAngle, wantedRotationAngle, rotationDamping * Time.deltaTime);

	currentHeight = Mathf.Lerp (currentHeight, wantedHeight, heightDamping * Time.deltaTime);
	//currentAlign = Mathf.Lerp (currentAlign, wantedAlign, alignDamping * Time.deltaTime);

	var currentRotation = Quaternion.Euler (0, currentRotationAngle, 0);
	
	transform.position = target.position;
	transform.position -= currentRotation * Vector3.forward * distance;

	transform.position.y = currentHeight;
	//transform.position.z = currentAlign;
	
	transform.LookAt (target);
}