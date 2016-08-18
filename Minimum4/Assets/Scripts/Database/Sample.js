#pragma strict
 
/*  Script for testing out SQLite in Javascript
          2011 - Alan Chatham
          Released into the public domain
 
        This script is a GUI script - attach it to your main camera.
        It creates/opens a SQLite database, and with the GUI you can read and write to it.
                                        *
 
// This is the file path of the database file we want to use
// Right now, it'll load TestDB.sqdb in the project's root folder.
// If one doesn't exist, it will be automatically created.
public var DatabaseName : String = "TestDB.sqdb";
 
// This is the name of the table we want to use
public var TableName : String = "TestTable";
var db : dbAccess;
 
function Start() {
    // Give ourselves a dbAccess object to work with, and open it
    db = new dbAccess();
    db.OpenDB(DatabaseName);
    // Let's make sure we've got a table to work with as well!
    var tableName = TableName;
    var columnNames = new Array("firstName","lastName");
    var columnValues = new Array("text","text");
    try {
        db.CreateTable(tableName,columnNames,columnValues);
    }
    catch(e) {// Do nothing - our table was already created
        //- we don't care about the error, we just don't want to see it
    }
}
 
// These variables just hold info to display in our GUI
var firstName : String = "First Name";
var lastName : String = "Last Name"; 
var DatabaseEntryStringWidth = 100;
var scrollPosition : Vector2;
var databaseData : ArrayList = new ArrayList();
 
// This GUI provides us with a way to enter data into our database
//  as well as a way to view it
function OnGUI() {
    GUI.Box(Rect (25,25,Screen.width - 50, Screen.height - 50),""); 
    GUILayout.BeginArea(Rect(50, 50, Screen.width - 100, Screen.height - 100));
    // This first block allows us to enter new entries into our table
        GUILayout.BeginHorizontal();
            firstName = GUILayout.TextField(firstName, GUILayout.Width (DatabaseEntryStringWidth));
            lastName = GUILayout.TextField(lastName, GUILayout.Width (DatabaseEntryStringWidth));
        GUILayout.EndHorizontal();
 
        if (GUILayout.Button("Add to database")) {
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
 
        GUILayout.Label("Database Contents");
        scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Height(100));
            for (var line : ArrayList in databaseData) {
                GUILayout.BeginHorizontal();
                for (var s in line) {
                    GUILayout.Label(s.ToString(), GUILayout.Width(DatabaseEntryStringWidth));
                }
                GUILayout.EndHorizontal();
            }
 
        GUILayout.EndScrollView();
        if (GUILayout.Button("Delete All Data")) {
            DeleteTableContents();
            databaseData = ReadFullTable();
        }
 
    GUILayout.EndArea();
}
 
// Wrapper function for inserting our specific entries into our specific database and table for this file
function InsertRow(firstName:String, lastName:String) {
    var values = new Array(("'"+firstName+"'"),("'"+lastName+"'"));
    db.InsertInto(TableName, values);
}
 
// Wrapper function, so we only mess with our table.
function ReadFullTable() {
    return db.ReadFullTable(TableName);
}
 
// Another wrapper function...
function DeleteTableContents() {
    db.DeleteTableContents(TableName);
}*/