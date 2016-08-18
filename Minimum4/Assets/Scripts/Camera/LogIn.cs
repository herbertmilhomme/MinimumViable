using UnityEngine;
using System;
using System.Collections;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;

public class LogIn : MonoBehaviour
{
#region Variables
	//static variables
	private string FILE_NAME = Application.persistentDataPath + "/Test.data";
	string email = "Email";
	string username = "Username";
	string password = "Password";
	bool rememberme = false;
	string loginurl = "http://localhost:40679/Account/Login";
	string signupurl = "http://localhost:40679/Account/Register";
	int DatabaseEntryStringWidth = 100;
	FileStream fs;
	//BinaryWriter w; //= new BinaryWriter(fs);
	BinaryFormatter bf = new BinaryFormatter ();
	DataFile data = new DataFile();
	//Vector2 scrollPosition;

	//public variables
	public string CurrentMenu = "";

	//private variables
	bool StartGUI = false;
	//private string - = "";
#endregion

	void Awake(){
		//Placed at the end, cause onGUI calls method on each line/update, and i only want it to be called once.
		//Check to see if a binary data file exist on local drive
		//OldMe ();
		//If data file exist, load data, and overwrite current variables with saved data
	}

	// Use this for initialization
	void Start ()
	{
		StartGUI = true;
	}// End Start
	
	// Design Login Layout
	void OnGUI ()
	{

		if (StartGUI == true) {
			//Displays a boxed-area in the background
			GUI.Box (new Rect (25, 25, Screen.width - 50, Screen.height - 50), CurrentMenu); 
			//Working area/margins of the DisplayArea
			GUILayout.BeginArea (new Rect (50, 50, Screen.width - 100, Screen.height - 100));

			//Check to see if a binary data file exist on local drive
			OldMe ();
			//If data file exist, load data, and overwrite current variables with saved data

			//Window header
			GUILayout.Label (CurrentMenu);

			//Creates a new horizontal line for Input Fields
			GUILayout.BeginHorizontal ();
			//Creates Header for Input Field
			GUILayout.Label ("Username:");
			//Creates Username Input Fields
			username = GUILayout.TextField (username, GUILayout.Width (DatabaseEntryStringWidth));
			//password = GUILayout.PasswordField(password, "*"[0], GUILayout.Width (DatabaseEntryStringWidth));
			GUILayout.EndHorizontal ();

			//Creates a new horizontal line for Input Fields
			GUILayout.BeginHorizontal ();
			//Creates Header for Input Field
			GUILayout.Label ("Password:");
			//Creates Password Input Fields
			password = GUILayout.PasswordField (password, "●" [0], GUILayout.Width (DatabaseEntryStringWidth));
			GUILayout.EndHorizontal ();

			//Creates a new horizontal line for Input Fields
			GUILayout.BeginHorizontal ();
			//Creates Header for Input Field
			GUILayout.Label ("Remember Username:");
			//Creates Toggle Button (to user-info on local-drive)  Input Fields
			rememberme = GUILayout.Toggle (rememberme, "");
			GUILayout.EndHorizontal ();

			//Navigation Buttons
			// Send web request to login
			GUILayout.BeginHorizontal ();
			if (GUILayout.Button ("Log In")) {
				Debug.Log ("Login Button Pressed");
				//Write values to data file if 'RememberMe' is true, clear if false
				RememberMe ();
				StartCoroutine (LoginAccount ());
				Debug.Log ("Login Button Pressed...");
			}
			GUILayout.EndHorizontal ();

			/*// Send web request to login
		GUILayout.BeginHorizontal();
		if (GUILayout.Button ("Log In")) {
			LoginAccount ();
		}
		if (GUILayout.Button("Clear"))
			//databaseData.Clear();
		GUILayout.EndHorizontal();
		/*if (GUILayout.Button("Add to database")) {
			// Insert the data
			InsertRow(firstName,lastName);
			// And update the readout of the database
			databaseData = ReadFullTable();
		}
		// This second block gives us a button that will display/refresh the contents of our database
		GUILayout.BeginHorizontal();
		if (GUILayout.Button ("Read Database")) 
			databaseData = ReadFullTable();
		if (GUILayout.Button("Clear"))
			databaseData.Clear();
		GUILayout.EndHorizontal();

		}*/
		
			//GUILayout.EndScrollView();
			GUILayout.EndArea ();
		}//End StartGUI
	}//End OnGUI

#region Binary Writing
	//Old Me
	void OldMe(){
		Debug.Log("Checking to see if BinaryText exist...");
		if (File.Exists(FILE_NAME)){
			Debug.Log(FILE_NAME + " already exists!");

			Debug.Log("Loading Old Info from BinaryText...");
			// Create the reader for data.
			//fs = new FileStream(FILE_NAME, FileMode.Open, FileAccess.Read);
			fs = File.Open(FILE_NAME, FileMode.Open, FileAccess.Read);
			Debug.Log("Information Loaded.");
			Debug.Log("Deserializing Information...");
			data = (DataFile)bf.Deserialize(fs);
			Debug.Log("Rewriting TextField/Variables...");
			username = data.username;
			rememberme = data.rememberme;
			Debug.Log("Information Loaded and Updated.");
			Debug.Log("Closing BinaryText...");
			Debug.Log("Closing FileStream...");
			fs.Close();
			Debug.Log("BinaryText Closed.");
			return;
		}
		//Dont think i need an else...
		/*else if(!File.Exists(FILE_NAME)){
			Debug.Log("BinaryText does not exist");
			
			Debug.Log("Creating BinaryText...");
			// Create the new, empty data file.
			fs = File.Create(FILE_NAME, FileMode.CreateNew, FileAccess.Write);
			Debug.Log("Filed saved to: '" + fs.Name + "'");
			Debug.Log("Saving information to Variable...");
			Debug.Log("Writing... " + username + "," + rememberme.ToString());
			data.username = username;
			data.rememberme = rememberme;
			Debug.Log("Done saving information to BinaryText.");
			Debug.Log("Closing BinaryText...");
			Debug.Log("Closing FileStream...");
			fs.Close();
			Debug.Log("BinaryText Closed.");
		 	return;
		}*/
	}//End OldMe
	
	//New Me
	void RememberMe(){
		//Write values to data file if 'RememberMe' is true, clear if false

		//If rememberme is true
		if (rememberme == true) {
			Debug.Log("Toggle Button is TRUE");

			Debug.Log("Checking to see if BinaryText exist...");
			if (File.Exists(FILE_NAME)){
				Debug.Log(FILE_NAME + " already exists!");

				Debug.Log("Opening BinaryText...");
				fs = File.Open(FILE_NAME, FileMode.Open, FileAccess.ReadWrite);
				Debug.Log("Storing Variable Data...");
				data.username = username;
				data.rememberme = rememberme;

				Debug.Log("Saving information to BinaryText...");
				bf.Serialize(fs,data);
				Debug.Log("Done saving information to BinaryText.");
				Debug.Log("Closing BinaryText...");
			}else{ //if(!File.Exists(FILE_NAME)){
				Debug.Log("BinaryText does not exist");

				Debug.Log("Creating BinaryText...");
				// Create the new, empty data file.
				fs = File.Create(FILE_NAME/*, FileMode.CreateNew, FileAccess.Write*/); 
				Debug.Log("Filed saved to: '" + fs.Name + "'");
				Debug.Log("Storing Variable Data...");
				data.username = username;
				data.rememberme = rememberme;
				Debug.Log("Saving information to BinaryText...");
				Debug.Log("Writing... " + username + "," + rememberme.ToString());
				bf.Serialize(fs,data);

				Debug.Log("Done saving information to BinaryText.");
			}
			Debug.Log("Closing BinaryText...");
			//Debug.Log("Closing Writer...");
			//bf.Close();
			Debug.Log("Closing FileStream...");
			fs.Close();
			Debug.Log("BinaryText Closed.");
			return;// true;
		}
		//Write values to data file if 'RememberMe' is true, clear if false
		//If rememberme is false
		else{
			Debug.Log("Toggle Button is FALSE");
						
			Debug.Log("Checking to see if BinaryText exist...");
			if (File.Exists(FILE_NAME)){
				Debug.Log(FILE_NAME + " already exists!");
				//return;

				fs = File.Open(FILE_NAME, FileMode.Open, FileAccess.ReadWrite);
				Debug.Log("Storing variable information...");
				//Clears Username
				data.username = "Username";
				data.rememberme = rememberme;
				Debug.Log("Saving information to BinaryText...");
				bf.Serialize(fs, data);
				Debug.Log("Done saving information to BinaryText.");
				Debug.Log("Closing BinaryText...");
				//return false;
			}
			//I dont think i need an "IF", when the file doesnt exist
			else{ //if(!File.Exists(FILE_NAME)){
				Debug.Log("BinaryText does not exist");
				
				Debug.Log("Creating BinaryText...");
				// Create the new, empty data file.
				fs = File.Create(FILE_NAME/*, FileMode.CreateNew, FileAccess.Write*/); 
				Debug.Log("Filed saved to: '" + fs.Name + "'");
				Debug.Log("Storing variable information...");
				//Clears Username
				data.username = "Username";
				data.rememberme = rememberme;
				Debug.Log("Saving information to BinaryText...");
				bf.Serialize(fs, data);
				Debug.Log("Done saving information to BinaryText.");
			}
			Debug.Log("Closing BinaryText...");
			Debug.Log("Closing FileStream...");
			fs.Close();
			Debug.Log("BinaryText Closed.");
			return;
		}
		//return;
	}//RememberMe End
	#endregion
	
	#region Sign-in
	IEnumerator LoginAccount(){
		Debug.Log ("Login Co-Routine Started");
		//Add values that will be entered on page
		WWWForm Form = new WWWForm ();
		//Match the fields exactly
		Form.AddField ("provider", "Unity"); //validation purposes
		//Form.AddField ("loginData", ""); //validation purposes
		//Form.AddField ("provider", ""); //validation purposes
		Form.AddField ("email", username);
		Form.AddField ("password", password);
		Form.AddField ("rememberMe", "false");
		//Form.data
		WWW LoginAccountWWW = new WWW (loginurl, Form);
		yield return LoginAccountWWW;
		//debug error logging with IF statements
		if (LoginAccountWWW.error != null) {
			Debug.Log (LoginAccountWWW.text);
			Debug.Log ("Cannot connect to Login");
			Debug.Log (LoginAccountWWW.text);
		} else {
			//More Log Debugging
			Debug.Log ("Connected...");
			Debug.Log (Form.data.ToString()); //Curious on what the data looks like
			string LogText = LoginAccountWWW.text.Substring(0, LoginAccountWWW.text.IndexOf("<!DOCTYPE") );// + LoginAccountWWW.text.IndexOf("<!DOCTYPE").ToString().Length - 10
			Debug.Log (LogText);
			string[] LogTextSplit = LogText.Split (':');
			if (LogTextSplit [0] == "0") {//int value representing # of characters
				Debug.Log ("0");
				if (LogTextSplit [1] == "Success") {
					Debug.Log ("Success:1");
					Application.LoadLevel (1); //character create
				}
			}else{
				if(LogTextSplit[1] == "Success"){
					Debug.Log ("Success:2");
					Application.LoadLevel(1); //character select
				}
			}
			//Clears Form
			Debug.Log (LoginAccountWWW.responseHeaders.ToString());
			LoginAccountWWW.Dispose();
		}
		username = "";
		password = "";
	}//End LoginAccount
#endregion
#region Sign-up
	IEnumerator NewAccount(){
		Debug.Log ("Sign-up Co-Routine Started");
		//Add values that will be entered on page
		WWWForm Form = new WWWForm ();
		//Match the fields exactly
		Form.AddField ("provider", "Unity"); //validation purposes
		//Form.AddField ("loginData", ""); //validation purposes
		//Form.AddField ("provider", ""); //validation purposes
		Form.AddField ("email", email); //must contain @ and .
		Form.AddField ("username", username);
		Form.AddField ("name", name);
		Form.AddField ("password", password); //minimum of 6 char
		Form.AddField ("confirmPassword", password);//must equal password
		//Form.data
		WWW CreateAccountWWW = new WWW (signupurl, Form);
		yield return CreateAccountWWW;
		//debug error logging with IF statements
		if (CreateAccountWWW.error != null) {
			Debug.Log (CreateAccountWWW.text);
			Debug.Log ("Cannot connect to Sign-up");
			Debug.Log (CreateAccountWWW.text);
		} else {
			//More Log Debugging
			Debug.Log ("Connected...");
			string LogText = CreateAccountWWW.text.Substring(0, CreateAccountWWW.text.IndexOf("<!DOCTYPE") );
			Debug.Log (LogText);
			string[] LogTextSplit = LogText.Split (':');
			if (LogTextSplit [0] == "0") {//int value representing # of characters
				Debug.Log ("0");
				if (LogTextSplit [1] == "Success") {
					Debug.Log ("Success:1");
					Application.LoadLevel (1); //character create
				}
			}else{
				if(LogTextSplit[1] == "Success"){
					Debug.Log ("Success:2");
					Application.LoadLevel(1); //character select
				}
			}
		}
	}
#endregion
}//Script End


//Application.persistentDataPath
[Serializable]
class DataFile{
	//user log in data
	public string username;
	public bool rememberme;
	//-game settings 
	//language
	//-controls settings
	//input_
}//End Class PlayerData