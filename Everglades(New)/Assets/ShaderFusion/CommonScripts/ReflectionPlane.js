//var globalTexture:boolean = true;
var hdrTexture:boolean = false;
var textureName:String = "_ReflectionTex";
var reflectionResScaler:float = 0.5;
@HideInInspector var renderBuffer:RenderTexture;
@HideInInspector var cam:Camera;
@HideInInspector var shouldRender:boolean = false;
@HideInInspector var currentlyHDR:boolean = false;
@HideInInspector var currentCam:Camera;

@script ExecuteInEditMode()

function Start() {
	//SetupRenderBuffer();
	//SetupCamera();
	//shouldRender = true;
	//Render();
	//shouldRender = false;
}

function OnDrawGizmos() {
	//Trick editor into constantly updating in edit mode.
	if (cam) {
		var tmpVector:Vector3 = cam.transform.position;
		cam.transform.position = tmpVector;
	}
}

function OnWillRenderObject() {
	shouldRender = true;
}

function LateUpdate() {
	if (shouldRender) {
		Render();
		shouldRender = false;
	}
}

function Render() {
	if (!renderBuffer || Screen.width*reflectionResScaler != renderBuffer.width || 
		Screen.height*reflectionResScaler != renderBuffer.height ||
		currentlyHDR != hdrTexture) {
		SetupRenderBuffer();
	}
	
	if (!cam) {
		SetupCamera();
	}
	
	//var currentCam:Camera;
	currentCam = Camera.current;
	if (!currentCam) return;
	
	var pos:Vector3 = transform.position;
	var normal:Vector3 = transform.up;
	
	// Reflect camera around reflection plane
	var d:float = -Vector3.Dot (normal, pos) - 0.07;
	var reflectionPlane:Vector4 = Vector4 (normal.x, normal.y, normal.z, d);

	var reflection:Matrix4x4 = Matrix4x4.zero;
	reflection = CalculateReflectionMatrix(reflection, reflectionPlane);
	var oldpos:Vector3 = currentCam.transform.position;
	var newpos:Vector3 = reflection.MultiplyPoint( oldpos );
	cam.worldToCameraMatrix = currentCam.worldToCameraMatrix * reflection;

	// Setup oblique projection matrix so that near plane is our reflection
	// plane. This way we clip everything below/above it for free.
	var clipPlane:Vector4 = CameraSpacePlane(cam, pos, normal, 1.0 );
	var projection:Matrix4x4 = currentCam.projectionMatrix;
	projection = CalculateObliqueMatrix (projection, clipPlane);
	cam.projectionMatrix = projection;
	
	var euler:Vector3 = currentCam.transform.eulerAngles;
	cam.transform.eulerAngles = Vector3(-euler.x, euler.y, euler.z);
	
	cam.fieldOfView = currentCam.fieldOfView;
	cam.backgroundColor = currentCam.backgroundColor;
	cam.nearClipPlane = currentCam.nearClipPlane;
	cam.farClipPlane = currentCam.farClipPlane;
	
	cam.targetTexture = renderBuffer;
	GL.SetRevertBackfacing(true);
	cam.Render();
	GL.SetRevertBackfacing(false);
	cam.targetTexture = null;
	
	Shader.SetGlobalTexture(textureName,renderBuffer);
}

function SetupCamera() {
	if (cam) {
		DestroyImmediate(cam);
	}
	cam = GameObject("_ReflectionPlaneCamera").AddComponent(Camera);
	cam.enabled = false;
	cam.renderingPath = RenderingPath.Forward;
	//cam.gameObject.hideFlags = HideFlags.HideAndDontSave;
}

function SetupRenderBuffer() {
	if (renderBuffer) {
		DestroyImmediate(renderBuffer);
	}
	var newSize:Vector2 = Vector2(Screen.width*reflectionResScaler,Screen.height*reflectionResScaler);
	if (newSize.x < 1) newSize.x = 1;
	if (newSize.y < 1) newSize.y = 1;
	renderBuffer = RenderTexture(newSize.x,newSize.y,24);
	if (hdrTexture) {
		renderBuffer.format = RenderTextureFormat.ARGBHalf;
		currentlyHDR = true;
	}
	else {
		currentlyHDR = false;
	}
	renderBuffer.Create();
	Shader.SetGlobalTexture(textureName,renderBuffer);
}


//Camera Transform Stuff
/////////////////////////////////////////////////

// Given position/normal of the plane, calculates plane in camera space.
function CameraSpacePlane (cam:Camera, pos:Vector3, normal:Vector3, sideSign:float):Vector4 {
	var offsetPos:Vector3 = pos + normal * 0.07;
	var m:Matrix4x4 = cam.worldToCameraMatrix;
	var cpos:Vector3 = m.MultiplyPoint( offsetPos );
	var cnormal:Vector3 = m.MultiplyVector( normal ).normalized * sideSign;
	return new Vector4( cnormal.x, cnormal.y, cnormal.z, -Vector3.Dot(cpos,cnormal) );
}

// Calculates reflection matrix around the given plane
static function CalculateReflectionMatrix(reflectionMat:Matrix4x4, plane:Vector4):Matrix4x4 {
	reflectionMat.m00 = (1F - 2F*plane[0]*plane[0]);
	reflectionMat.m01 = (   - 2F*plane[0]*plane[1]);
	reflectionMat.m02 = (   - 2F*plane[0]*plane[2]);
	reflectionMat.m03 = (   - 2F*plane[3]*plane[0]);

	reflectionMat.m10 = (   - 2F*plane[1]*plane[0]);
	reflectionMat.m11 = (1F - 2F*plane[1]*plane[1]);
	reflectionMat.m12 = (   - 2F*plane[1]*plane[2]);
	reflectionMat.m13 = (   - 2F*plane[3]*plane[1]);

	reflectionMat.m20 = (   - 2F*plane[2]*plane[0]);
	reflectionMat.m21 = (   - 2F*plane[2]*plane[1]);
	reflectionMat.m22 = (1F - 2F*plane[2]*plane[2]);
	reflectionMat.m23 = (   - 2F*plane[3]*plane[2]);

	reflectionMat.m30 = 0F;
	reflectionMat.m31 = 0F;
	reflectionMat.m32 = 0F;
	reflectionMat.m33 = 1F;
	return reflectionMat;
}

// Extended sign: returns -1, 0 or 1 based on sign of a
static function sgn(a:float):float {
	if (a > 0.0f) return 1.0f;
	if (a < 0.0f) return -1.0f;
	return 0.0f;
}

// Adjusts the given projection matrix so that near plane is the given clipPlane
// clipPlane is given in camera space. See article in Game Programming Gems 5 and
// http://aras-p.info/texts/obliqueortho.html
static function CalculateObliqueMatrix(projection:Matrix4x4, clipPlane:Vector4):Matrix4x4 {
	var q:Vector4 = projection.inverse * new Vector4(
		sgn(clipPlane.x),
		sgn(clipPlane.y),
		1.0f,
		1.0f
	);
	var c:Vector4 = clipPlane * (2.0F / (Vector4.Dot (clipPlane, q)));
	// third row = clip plane - fourth row
	projection[2] = c.x - projection[3];
	projection[6] = c.y - projection[7];
	projection[10] = c.z - projection[11];
	projection[14] = c.w - projection[15];
	return projection;
}

