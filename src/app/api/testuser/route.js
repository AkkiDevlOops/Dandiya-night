import mongoose from "mongoose";
import User from "../../../models/user.js"
import 'dotenv/config'


import connectDB from "../../../lib/db.js";



connectDB();

async function saveBatchUsers(payload) {
  try {
    // Extract the array of users from the single payload object
    const usersArray = [
  {
    "enrollmentNo": "0101AU241001",
    "name": "AALOKIK GUPTA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241002",
    "name": "ABHAY CHOUDHARY",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241003",
    "name": "ADARSH",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241004",
    "name": "AJAY KUSHWAHA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241005",
    "name": "AMRTANSH GOUR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241006",
    "name": "ANAND PRAJAPATI",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241007",
    "name": "ANSH PANDEY",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241008",
    "name": "AYUSH SINGH SENGAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241009",
    "name": "BHOOMIKA THAKUR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241010",
    "name": "CHIRAG SHARMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241011",
    "name": "DARSHAN MANDVAL",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241012",
    "name": "DEEPENDRA SAINI",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241013",
    "name": "DEEPESH SAHU",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241014",
    "name": "DEVENDRA CHADAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241015",
    "name": "DULICHAND BAHESHWAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241016",
    "name": "GOURAV THAKRE",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241017",
    "name": "HARSHITA VERMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241018",
    "name": "HIMANSHI BHARDWAJ",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241019",
    "name": "ISHITA PALIWAL",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241020",
    "name": "KARTIK SHARMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241021",
    "name": "KHUSHI KUSHWAHA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241022",
    "name": "KRISHNA DEVNATH",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241023",
    "name": "KRISHNA ZADE",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241024",
    "name": "KSHITIZ SHINDE",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241025",
    "name": "MAHI CHOURASIYA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241026",
    "name": "MANISH CHAKRAWARTI",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241027",
    "name": "MOHD AFFAN KHAN",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241028",
    "name": "PARAG SINGH BAIS",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241029",
    "name": "PIYUSH SHRIVASTAVA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241030",
    "name": "PRATEEK SINGH",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241031",
    "name": "PRDEEP KUSHWAHA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241032",
    "name": "PREM PARMAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241033",
    "name": "PRINCE BIRLA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241034",
    "name": "PRINCE NAMDEV",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241035",
    "name": "PRITIKA GUPTA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241036",
    "name": "PUSHPRAJ SAHU",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241037",
    "name": "RAGHAV VASHISHTHA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241038",
    "name": "RAHUL DHAKAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241039",
    "name": "RISHABH PANWAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241040",
    "name": "RIYA NEMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241041",
    "name": "SAHIL PATEL",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241042",
    "name": "SAKSHI VISHWAKARMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241043",
    "name": "SHASHWAT TRIPATHI",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241044",
    "name": "SHUBHANGI BAHEKAR",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241045",
    "name": "SHUBHANSHU JAIN",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241046",
    "name": "SUDHANSHU SHARMA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241047",
    "name": "TOHEED ULLAH",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241048",
    "name": "UDITANSHU MALVIYA",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241049",
    "name": "VAIBHAV TIWARI",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU241050",
    "name": "VISHAL YADAV",
    "program": "B.Tech Automobile Engineering",
    "programCode": "AU",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241001",
    "name": "AATMDEEP PATEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241002",
    "name": "ABHIMANYU MISHRA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241003",
    "name": "ABHINAV MOHABE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241004",
    "name": "ABHISHEK AHIRWAR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241005",
    "name": "ADARSH ABHIRAM MISHRA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241006",
    "name": "ADARSH GAUTAM",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241007",
    "name": "AHMAD HUSSAIN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241008",
    "name": "AKASH MEENA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241009",
    "name": "AKHIL MISHRA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241010",
    "name": "ANIL KUMAR KULASTE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241011",
    "name": "ANUJ TRIPATHI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241012",
    "name": "ANURAG PAWAR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241013",
    "name": "ANURAG TRIPATHI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241014",
    "name": "ANVENSHITA SINGH",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241015",
    "name": "ARMAN KHAN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241016",
    "name": "ARPIT SINGH THAKUR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241017",
    "name": "ASHISH PATEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241018",
    "name": "ASHISH PURVIYA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241019",
    "name": "ATHARV BAGHEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241020",
    "name": "ATUL SINGH YADAV",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241021",
    "name": "DEEPAK SAHU",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241022",
    "name": "DEEPAK VERMA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241023",
    "name": "DEEPIKA TIWARI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241024",
    "name": "DEV KHATARKAR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241025",
    "name": "DEVRAJ MEWADA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241026",
    "name": "GAGAN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241027",
    "name": "GANGARAM BHURIYA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241028",
    "name": "GAURAV SHUKLA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241029",
    "name": "GITANSH PATLE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241030",
    "name": "GOUTAM",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241031",
    "name": "HARSH LODHI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241032",
    "name": "HARSHITA BAGHEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241033",
    "name": "KALYANI THAKUR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241034",
    "name": "KOUSHAL PATIDAR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241035",
    "name": "KRISHLAY BISEN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241036",
    "name": "KRISHNA DHURVE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241037",
    "name": "LAKSHYA JAGTAP",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241038",
    "name": "LUCKY KUSHWAHA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241039",
    "name": "MOHAMMAD ALI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241040",
    "name": "MOHD IMRAN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241041",
    "name": "MOHINI SINGH",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241042",
    "name": "MONIKA SAGAR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241043",
    "name": "NIDHI JAISWAL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241044",
    "name": "NIMESH KANATHE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241045",
    "name": "NIMISHA MEENA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241046",
    "name": "NIRMALA BHILALE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241047",
    "name": "NITIN ARYA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241048",
    "name": "OM MISHRA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241049",
    "name": "PALLAVI SINGH PATEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241050",
    "name": "PRADEEP",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241051",
    "name": "PRAMISH TRIPATHI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241052",
    "name": "PRASHANT CHOUHAN",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241053",
    "name": "PRAVEEN KUMAR SINGH",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241054",
    "name": "PRIYA MARKAM",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241055",
    "name": "PUSHP KUMAR TIWARI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241056",
    "name": "RAJ DONGRE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241057",
    "name": "RAJENDRA NIMORE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241058",
    "name": "RISHABH PATEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241059",
    "name": "RISHAV SHUKLA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241060",
    "name": "RUSTAM PRAJAPATI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241061",
    "name": "SAAIPRIYA SINGH THAKUR",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241062",
    "name": "SAGAR MALLAH",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241063",
    "name": "SAHIL SONDHIYA",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241064",
    "name": "SANDEEP JATAV",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241065",
    "name": "SANJANA PARTE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241066",
    "name": "SAUMY RATHORE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241067",
    "name": "SHASHANK DHAKAD",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241068",
    "name": "SHUBHAM VAISHNAV",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241069",
    "name": "SHYAM MANDLOI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241070",
    "name": "SOMIL CHOUKSEY",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241071",
    "name": "SRISTHI RAJPUT",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241072",
    "name": "SUCHI SINGH",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241073",
    "name": "SUJAL DUDVE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241074",
    "name": "TANISHKA SHIVHARE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241075",
    "name": "VAISHNAVI PANTHI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241076",
    "name": "VANSHRAJ SINGH SOLANKI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241077",
    "name": "VIKASH SAKET",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241078",
    "name": "VINAYAK DWIVEDI",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241079",
    "name": "VIPUL SABLE",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE241080",
    "name": "YATHARTH PATEL",
    "program": "B.Tech Civil Engineering",
    "programCode": "CE",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS241001",
    "name": "AADI JAIN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241002",
    "name": "AASHI ASATI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241003",
    "name": "AASHITA GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241004",
    "name": "AASHUTOSH VINAYAK GOSWAMI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241005",
    "name": "AAYUSH RAIKHERE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241006",
    "name": "AAYUSH YADAV",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241007",
    "name": "ABHINANDAN PATHAk",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241008",
    "name": "ABHINAV RATHORE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241009",
    "name": "ADARSH MISHRA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241010",
    "name": "ADITYA KUMAR NAGWANSHI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241011",
    "name": "ADNAN AHAMED",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241012",
    "name": "AHSAAN MUZAFFAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241013",
    "name": "AJAY SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241014",
    "name": "AKASH GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241015",
    "name": "AKSHAT SAGAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241016",
    "name": "AKSHAT SOHANI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241017",
    "name": "AMAN AGRAWAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241018",
    "name": "ANISHKA SOOD",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241019",
    "name": "ANJALI BHARIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241020",
    "name": "ANJALI SONARE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241021",
    "name": "ANKIT VANSHALE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241022",
    "name": "ANSHIKA MAHTO",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241023",
    "name": "ANUGRAH DEVANSH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241024",
    "name": "ANUJ PARMAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241025",
    "name": "ANUP KUMAR KOL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241026",
    "name": "ANURAG KURMI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241027",
    "name": "ANURAG MEHRA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241028",
    "name": "APOORVA KUMAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241029",
    "name": "ARCHITA DALAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241030",
    "name": "ARJUN DAWAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241031",
    "name": "ARPAN JAIN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241032",
    "name": "ARPIT JAIN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241033",
    "name": "ARPIT KOL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241034",
    "name": "ARYA SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241035",
    "name": "ARYAN TIWARI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241036",
    "name": "ASHI YADAV",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241037",
    "name": "ASHMITA DEBNATH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241038",
    "name": "ASHWIN SHRIVASTAVA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241039",
    "name": "ATHARVA SHEOPURE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241040",
    "name": "ATUL KUMAR MERAVI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241041",
    "name": "AVATANSH MISHRA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241042",
    "name": "AVIRAL VISHWAKARMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241043",
    "name": "AYUSH DWIVEDI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241044",
    "name": "AYUSH JAISWAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241045",
    "name": "AYUSH SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241046",
    "name": "AYUSHMAN TIWARI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241047",
    "name": "BHARAT BELWANSHI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241048",
    "name": "CHANDRESH BHOJ",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241049",
    "name": "CHETAN BAHL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241050",
    "name": "CHETAN KHATARKAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241051",
    "name": "DEEPESH GAUTAM",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241052",
    "name": "DEV VISHWAKARMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241053",
    "name": "DHARMIK KASHYAP",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241054",
    "name": "DIVYA AAWALASIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241055",
    "name": "DURGA SAHU",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241056",
    "name": "GAGAN AHIRWAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241057",
    "name": "GOURAV GHORMARE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241058",
    "name": "GOURAV LOWANSHI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241059",
    "name": "GULAM HASNAIN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241060",
    "name": "HARIOM SOLANKI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241061",
    "name": "HARSH BARDHAN SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241062",
    "name": "HARSH DEVDA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241063",
    "name": "HARSH GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241064",
    "name": "HARSH KUMAR DAHERIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241065",
    "name": "HARSHIT NAVIK",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241066",
    "name": "HIMANSHI PATEL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241067",
    "name": "INDERJEET GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241068",
    "name": "ISHA KHOUD",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241069",
    "name": "ISHA PALIWAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241070",
    "name": "ISHAN DOUR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241071",
    "name": "ISHIKA GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241072",
    "name": "ISHITA PATERIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241073",
    "name": "JANHVI PANDEY",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241074",
    "name": "JAY KUMAR SAHU",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241075",
    "name": "KAJAL DOHARE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241076",
    "name": "KANIKA MANKER",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241077",
    "name": "KARITICHAND",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241078",
    "name": "KARTIK CHOUKSEY",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241079",
    "name": "KARTIK SISODIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241080",
    "name": "KASHISH BHURIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101CS241081",
    "name": "KEVIN MESHRAM",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241082",
    "name": "KHUSHI SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241083",
    "name": "KOUSTUBH SHRIVASTAVA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241084",
    "name": "KRISHNA PATEL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241085",
    "name": "KRISHNA SONI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241086",
    "name": "KUNAL DAMKE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241087",
    "name": "LAKHAN PATIDAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241088",
    "name": "LAKSHY BADIYE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241089",
    "name": "LOKESH AHIRWAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241090",
    "name": "MAHI VERMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241091",
    "name": "MANOHER SINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241092",
    "name": "MAYURI KHARWAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241093",
    "name": "MOHAN GIRARE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241094",
    "name": "MOHIT BORALE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241095",
    "name": "MOKSHAVI KANGALE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241096",
    "name": "NARENDRA SINGH CHANDRAWAT",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241097",
    "name": "NILESH CHOUHAN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241098",
    "name": "NIRMALA KANESH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241099",
    "name": "NITIN PAHADE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241100",
    "name": "PALAK TUMBEKAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241101",
    "name": "PANKAJ DHAKAD",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241102",
    "name": "PARVEEN KUMAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241103",
    "name": "PINTU RAM KOL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241104",
    "name": "PRABHAT GARG",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241105",
    "name": "PRAKHAR SAHU",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241106",
    "name": "PRAKHAR SUDELE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241107",
    "name": "PRINCE VYAS",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241108",
    "name": "PURVI BARAPATRE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241109",
    "name": "RADHA MAHARA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241110",
    "name": "RAGHAV BANSAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241111",
    "name": "RAJ KUMAR AHIRWAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241112",
    "name": "RAMEEZ KHAN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241113",
    "name": "RASHID JAMAL BHAT",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241114",
    "name": "RAVI BACHHANIYA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241115",
    "name": "RISHABH KAWDE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241116",
    "name": "ROHIT PRAJAPATI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241117",
    "name": "RUDRANSH GOYAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241118",
    "name": "SACHIN SAHU",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241119",
    "name": "SAHIL CHATURVEDI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241120",
    "name": "SAKET GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241121",
    "name": "SAKSHI SAKET",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241122",
    "name": "SAMEER PUROHIT",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241123",
    "name": "SANJEEV KUMAR PANDEY",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241124",
    "name": "SARVESH BHAVEDIA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241125",
    "name": "SATWIK JAIN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241126",
    "name": "SATYAM DUBEY",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241127",
    "name": "SAURAV DHANANI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241128",
    "name": "SAURAV MISHRA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241129",
    "name": "SHASHANK MORE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241130",
    "name": "SHASHANK VERMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241131",
    "name": "SHIVANG SONI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241132",
    "name": "SHIVANI CHOUHAN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241133",
    "name": "SHIVANSHU PATEL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241134",
    "name": "SHRADDHA VERMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241135",
    "name": "SHREYA SHABANI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241136",
    "name": "SHUBHAM SINGH SIDAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241137",
    "name": "SHUBHANSHU CHOUDHARY",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241138",
    "name": "SIDDHARTH LOVANSHI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241139",
    "name": "SNEHA BORBAN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241140",
    "name": "SOMIYA DAWAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241141",
    "name": "SONAKSHI TIWARI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241142",
    "name": "SUJAL PATIDAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241143",
    "name": "SUJAL PATIDAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241144",
    "name": "SUMAN SHEKHAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241145",
    "name": "SUMIT KUMAR DINKAR",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241146",
    "name": "SUPRIYA SEN",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241147",
    "name": "SURAJ PATEL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241148",
    "name": "SURYANSH SANKHERE",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241149",
    "name": "SUYOG JARWAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241150",
    "name": "TANULSINGH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241151",
    "name": "UDAY RAJ SINGH PATEL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241152",
    "name": "UTKARSH MUDGAL",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241153",
    "name": "VAIDIKA PUROHIT",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241154",
    "name": "VISHAL GUPTA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241155",
    "name": "VIVEK ANAND SONI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241156",
    "name": "VIVEK DHAKAD",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241157",
    "name": "YASHA VISHWAKARMA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241158",
    "name": "YOGESH",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241159",
    "name": "YOGESH MEENA",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101CS241160",
    "name": "YUKTA AGNIHOTRI",
    "program": "B.Tech Computer Science Engineering",
    "programCode": "CS",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241001",
    "name": "AADISHREE SINGHAI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241002",
    "name": "AANCHAL PATEL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241003",
    "name": "AARTI MORGHADE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241004",
    "name": "AAYUSH SAHAY SHRIVASTAVA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241005",
    "name": "ABHAY TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241006",
    "name": "ABHISHEK KUMAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241007",
    "name": "ABHISHEK MANIK",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241008",
    "name": "ABHISHEK RAJORIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241009",
    "name": "ABHISHEK YADAV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241010",
    "name": "ADARSH KUMAR YADAV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241011",
    "name": "ADITYA BOHARE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241012",
    "name": "ADITYA CHOUHAN",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241013",
    "name": "ADITYA MANOJ",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241014",
    "name": "ADITYA SINGH RAJPUT",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241015",
    "name": "ADITYA VERMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241016",
    "name": "AJAY RAJAK",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241017",
    "name": "AJIT JAIN",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241018",
    "name": "AKHIL PATEL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241019",
    "name": "AKHILESH AHIRWAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241020",
    "name": "AKSHANSH DEHARIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241021",
    "name": "AKSHARA SONI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241022",
    "name": "AKSHAT VISHWAKARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241023",
    "name": "AMAN AHIRWAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241024",
    "name": "AMAN GEDAM",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241025",
    "name": "AMIT DHAKAD",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241026",
    "name": "ANIMESH VERMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241027",
    "name": "ANKITA PRAJAPAT",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241028",
    "name": "ANSHIKA PATEL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241029",
    "name": "ANUBHAV SHARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241030",
    "name": "ANUJ KUSHWAHA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241031",
    "name": "ANUJ SILAWAT",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241032",
    "name": "ANUSHKA DANGI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241033",
    "name": "ANUSHKA KUMARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241034",
    "name": "ANUSHKA MOHANIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241035",
    "name": "ARPITA WAGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241036",
    "name": "ARUN AHIRWAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241037",
    "name": "ASTIK BAGDE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241038",
    "name": "AYUSH SHARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241039",
    "name": "AYUSHI SAHU",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241040",
    "name": "BADAL SINGH GURJAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241041",
    "name": "BHAVYA MANDLEY",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241042",
    "name": "CHANDRAGUPT YADAV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241043",
    "name": "CHITRANSH RAGHUVANSHI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241044",
    "name": "DEEPANSHI MARON",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241045",
    "name": "DEEPENDRA DHAKAD",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241046",
    "name": "DEV VERMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241047",
    "name": "DEVANSH ANURAGI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241048",
    "name": "DEVANSHU NAGLE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241049",
    "name": "DEVENDRA KUMAR KAUL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241050",
    "name": "DIVYANSH SAHU",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241051",
    "name": "DURGESH SONARE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241052",
    "name": "GAGAN JATAV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241053",
    "name": "GAURAV TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241054",
    "name": "GAUTAM KHATEEK",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241055",
    "name": "GOURAV SAVASIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241056",
    "name": "GOURAV SINGH GILL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241057",
    "name": "GOURI JAISWAL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241058",
    "name": "GOUTAM ATULKAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241059",
    "name": "HARSH GIRGUNE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241060",
    "name": "HARSHVARDHAN AHIRWAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241061",
    "name": "HIMANSHU BELE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241062",
    "name": "INDRA CHANGEDIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241063",
    "name": "ISHIKA AGRAWAL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241064",
    "name": "JAYSHRI KHATARKAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241065",
    "name": "KALASH THAKRE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241066",
    "name": "KANAK NIBARIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241067",
    "name": "KANIKA SONI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241068",
    "name": "KARAN AYYAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241069",
    "name": "KARAN DASH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241070",
    "name": "KARTIK THAGELE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241071",
    "name": "KULDEEP KUSHWAHA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241072",
    "name": "KUNAL MESHRAM",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241073",
    "name": "LALIT VERMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241074",
    "name": "LOVEKESH CHOUKIKAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241075",
    "name": "MADHUR PARE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241076",
    "name": "MANOJ BELIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241077",
    "name": "MANSI RATHOD",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241078",
    "name": "MOHIT BHAMORIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "A"
  },
  {
    "enrollmentNo": "0101EC241079",
    "name": "MOHIT SAINI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241080",
    "name": "NANDINI ARYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241081",
    "name": "NIHAL SHARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241082",
    "name": "NISHANT SHUKLA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241083",
    "name": "NISHCHAY BHAWSAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241084",
    "name": "NITIN TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241085",
    "name": "NITIN VISHWAKARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241086",
    "name": "OMKAR SONI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241087",
    "name": "PALAK",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241088",
    "name": "PALAK YADAV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241089",
    "name": "PARV AGARWAL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241090",
    "name": "PAWAN AMKARE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241091",
    "name": "PAYAL GUPTA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241092",
    "name": "PIYUSH MISHRA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241093",
    "name": "PRAKASH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241094",
    "name": "PRAKASH SINGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241095",
    "name": "PRANAV SURYAWANSHI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241096",
    "name": "PRANAY TAYADE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241097",
    "name": "PRASANNAJEET CHOUDHARY",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241098",
    "name": "PREM SONDLE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241099",
    "name": "PUSHPENDRA SINGH THAKUR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241100",
    "name": "RAHUL ARYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241101",
    "name": "RAJEEV SARRAF",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241102",
    "name": "RAMAPRATAP SAHU",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241103",
    "name": "RISHABH NATH TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241104",
    "name": "RISHIK SONI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241105",
    "name": "RITESH AISHWAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241106",
    "name": "RITESH DWIVEDI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241107",
    "name": "RITVIJA PACHORI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241108",
    "name": "RIYANSHU SINGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241109",
    "name": "ROHINI SINGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241110",
    "name": "ROHIT RAJ",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241111",
    "name": "SACHI AGRAWAL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241112",
    "name": "SACHIN SINGH THAKUR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241113",
    "name": "SAGAR PATEL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241114",
    "name": "SAHIL KESHARWANI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241115",
    "name": "SAHIL SATPUTE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241116",
    "name": "SAMIKSHA RAI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241117",
    "name": "SANDEEP CHOUHAN",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241118",
    "name": "SANIDHYA GAUTAM",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241119",
    "name": "SANJANA KHOBRAGADE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241120",
    "name": "SARVANG SHARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241121",
    "name": "SATYAM DWIVEDI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241122",
    "name": "SATYAM KUSHWAHA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241123",
    "name": "SAYYED ZAFAR ALI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241124",
    "name": "SHEKH TOSHIF",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241125",
    "name": "SHIFA QURESHI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241126",
    "name": "SHIVAM GUPTA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241127",
    "name": "SHIVAM PARMAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241128",
    "name": "SHIVAM SURYAVANSHI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241129",
    "name": "SHIVANI SINGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241130",
    "name": "SHIVANSH BOHARE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241131",
    "name": "SHIVKANYA BIRLA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241132",
    "name": "SHIVNARAYAN PATEL",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241133",
    "name": "SHIVNATH PANDEY",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241134",
    "name": "SHOURABH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241135",
    "name": "SHREYASH KUMAR KURMI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241136",
    "name": "SHRIVARDHAN VISHWAKARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241137",
    "name": "SHUBHAM KUMAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241138",
    "name": "SONKUSLE SHASHWAT",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241139",
    "name": "SUBHESH RAWANDHE",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241140",
    "name": "SUMIT SHIV",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241141",
    "name": "SUMIT TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241142",
    "name": "SUNIL MAHOUR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241143",
    "name": "SURBHI GAUTAM",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241144",
    "name": "TANISHQDEEP SINGH KUSHWAH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241145",
    "name": "TEJAS GANDHI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241146",
    "name": "TEJASHWANI PARMAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241147",
    "name": "TUSHAR CHAUKIKAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241148",
    "name": "UPASANA PATANKAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241149",
    "name": "UPENDRA MAHOR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241150",
    "name": "UTKARSH SHARMA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241151",
    "name": "UTSAV KUMAR TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241152",
    "name": "VAIBHAVI TIWARI",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241153",
    "name": "VATSAL BHAWSAR",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241154",
    "name": "VINAYAK SINGH",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241155",
    "name": "VINEET KUMAR PANDEY",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EC241156",
    "name": "YUVRAJ KUMAR JHARIYA",
    "program": "B.Tech Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 1,
    "semester": 1,
    "section": "B"
  },
  {
    "enrollmentNo": "0101EX241001",
    "name": "AANAND SONARE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241002",
    "name": "AARJAV JAIN",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241003",
    "name": "AARYAN KACHHWAYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241004",
    "name": "ABHISHEK YADAV",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241005",
    "name": "ADARSH PANDEY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241006",
    "name": "ADARSH SINGH",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241007",
    "name": "AKASH SINGH NARWARIYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241008",
    "name": "AMRITA THAKUR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241009",
    "name": "ANANT KUMAR MISHRA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241010",
    "name": "ANANT VERMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241011",
    "name": "ANKIT CHOURASIYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241012",
    "name": "ANUJ PARMAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241013",
    "name": "ANUSHKA PATEL",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241014",
    "name": "ARHAM AHMED",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241015",
    "name": "ARMAN THAKUR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241016",
    "name": "ARPIT MISHRA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241017",
    "name": "ARPITA PANDEY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241018",
    "name": "ASMIT BHARGAVA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241019",
    "name": "ATUL RAI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241020",
    "name": "BISEN PALAK KAMALPRASAD",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241021",
    "name": "CHINMAY INGARE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241022",
    "name": "DEVANSH CHOUREY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241023",
    "name": "DIVY PRATAP SINGH",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241024",
    "name": "GOUTAM BHAMBHANI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241025",
    "name": "HARSH GOSWAMI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241026",
    "name": "HARSH KOSHTA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241027",
    "name": "HARSHVARDHAN SINGH HIRAWAT",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241028",
    "name": "HAYAT ALI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241029",
    "name": "HEMANT PAWAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241030",
    "name": "JATIN SETHIYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241031",
    "name": "KASHISH MATHANKER",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241032",
    "name": "KAUSHIKI TIWARI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241033",
    "name": "KAVITA BARDIYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241034",
    "name": "KRISH AHIRWAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241035",
    "name": "KRISHAN YOGI MISHRA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241036",
    "name": "MAHAK PATEL",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241037",
    "name": "MANANSH CHOUREY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241038",
    "name": "MANVENDRA SINGH SADHAK",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241039",
    "name": "MO ZAID KHAN",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241040",
    "name": "MOHANRAJ THAKRE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241041",
    "name": "MOHD AYAAN",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241042",
    "name": "NAITIK SHARMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241043",
    "name": "NILESH SAHU",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241044",
    "name": "PANCHIL SHARMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241045",
    "name": "PANKAJ SHARMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241046",
    "name": "POONAM YADAV",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241047",
    "name": "PRACHI LODHI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241048",
    "name": "PRADEEP GADRE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241049",
    "name": "PRATHMESH RAI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241050",
    "name": "PRINCESS ROHIT",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241051",
    "name": "RAJ MEWADE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241052",
    "name": "RAJ SINGH CHOUHAN",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241053",
    "name": "RAM PATIDAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241054",
    "name": "RASHIKA KORI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241055",
    "name": "SAGAR KUMAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241056",
    "name": "SAGAR ROKADE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241057",
    "name": "SANSKRITI MADRELE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241058",
    "name": "SANSTUTI PANDEY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241059",
    "name": "SHAHIL MESHRAM",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241060",
    "name": "SHRADDHA SINGH",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241061",
    "name": "SHUBHANSHI KATARE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241062",
    "name": "SRAJAL SHARMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241063",
    "name": "SYED YASIN ALI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241064",
    "name": "TUSHAR BOPCHE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241065",
    "name": "TUSHAR PRAJAPATI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241066",
    "name": "UMANG AGRAWAL",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241067",
    "name": "VAIDANSH PATIDAR",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241068",
    "name": "VANSHITA GAUTAM",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241069",
    "name": "VARUN KOSHTA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241070",
    "name": "VIKAS KATARE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241071",
    "name": "VIKASH PATEL",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241072",
    "name": "VINAYAK AWASTHI",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241073",
    "name": "VIPUL PANDEY",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241074",
    "name": "VISHAL VERMA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241075",
    "name": "VISHANK MAKODE",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241076",
    "name": "VIVEK SHUKLA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241077",
    "name": "YASH KALTA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EX241078",
    "name": "YASHI PATERIYA",
    "program": "B.Tech Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241001",
    "name": "AAYUSH SAHU",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241002",
    "name": "ABHINAV SHARMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241003",
    "name": "ADARSH DWIVEDI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241004",
    "name": "ADITYA TANDEKAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241005",
    "name": "AMEY AGNIHOTRI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241006",
    "name": "ANKUSH TIWARI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241007",
    "name": "ARYAN SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241008",
    "name": "ARYAN VERMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241009",
    "name": "ASHAY MOTGHARE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241010",
    "name": "AYAAN SIDDIQUI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241011",
    "name": "AYUSH MESHRAM",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241012",
    "name": "BADAL GOSWAMI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241013",
    "name": "BHARAT DANGI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241014",
    "name": "CHIRAG VERMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241015",
    "name": "DEV BHARGAV",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241016",
    "name": "GARVISHKA LAKWAL",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241017",
    "name": "HARSH KUMAR JATAV",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241018",
    "name": "JANHAVI SATRAMWAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241019",
    "name": "JATIN CHOUHAN",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241020",
    "name": "JAYDEEP BAKODE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241021",
    "name": "JITENDRA KUMAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241022",
    "name": "JITESH DHANWARE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241023",
    "name": "KAVYA THAKRE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241024",
    "name": "KESHAV AGAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241025",
    "name": "KHUSHI NIGAM",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241026",
    "name": "KHUSHI YADAV",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241027",
    "name": "KRISHNA YADAV",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241028",
    "name": "KUSHAL PATIDAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241029",
    "name": "MANAV SONI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241030",
    "name": "MANENDRA JHADE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241031",
    "name": "MAYANK BHUMARKAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241032",
    "name": "MEETANSH DUBEY",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241033",
    "name": "MITANSHI BHAWSAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241034",
    "name": "MOHIT SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241035",
    "name": "MONU PRAJAPATI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241036",
    "name": "NANCY JHA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241037",
    "name": "NIKHIL BHADWAL",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241038",
    "name": "NIKHIL GHANGHORIYA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241039",
    "name": "NISHANT AHIRWAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241040",
    "name": "PALAK KHARE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241041",
    "name": "PARTH SONWANE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241042",
    "name": "PIYUSH KUMAR CHAURASIYA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241043",
    "name": "PRABHAT KUMAR SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241044",
    "name": "RAHUL AHIRWAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241045",
    "name": "RISHABH DHOKE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241046",
    "name": "RISHABH PANDEY",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241047",
    "name": "ROSHAN KUMAR SUNANIYA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241048",
    "name": "SADHVI LADHAVE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241049",
    "name": "SAGAR PATEL",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241050",
    "name": "SAKSHAM DANGI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241051",
    "name": "SAKSHI SINHA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241052",
    "name": "SAMIT RAIKHERE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241053",
    "name": "SANJANA MEHRA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241054",
    "name": "SARIKA DUBEY",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241055",
    "name": "SHASHANK SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241056",
    "name": "SHIVAM KUAMR DAHIMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241057",
    "name": "SHIVAM SHIVANKAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241058",
    "name": "SHIVANI CHOUHAN",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241059",
    "name": "SHREEYANSH ASATI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241060",
    "name": "SHREYA THKUR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241061",
    "name": "SHRIRAM RAJPOOT",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241062",
    "name": "SHUBHANK PRAJAPATI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241063",
    "name": "SIDDHANT CHOUDHARY",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241064",
    "name": "SOUMYA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241065",
    "name": "SRIJAN SONI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241066",
    "name": "SRUJAN SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241067",
    "name": "SUJAL SANODIYA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241068",
    "name": "SUJAL SHARMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241069",
    "name": "SUMIT SHARMA",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241070",
    "name": "SWASTIK CHOUDHARY",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241071",
    "name": "SWATI BHASKAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241072",
    "name": "SWATI SINGH",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241073",
    "name": "TEKRAM KUSHRE",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241074",
    "name": "TUSHAR GOPLANI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241075",
    "name": "UPENDRA TRIPATHI",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241076",
    "name": "VANDANA PATIDAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241077",
    "name": "VIDIT SINGH CHADAR",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101IT241078",
    "name": "YOGESH PATEL",
    "program": "B.Tech Information Technology",
    "programCode": "IT",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241001",
    "name": "AAKARSHI JAIN",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241002",
    "name": "ABDUL SAMI ANSARI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241003",
    "name": "ABHISHEK KUMAR DWIVEDI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241004",
    "name": "AMIT CHANDRAVANSHI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241005",
    "name": "ANISH TIWARI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241006",
    "name": "ANKIT MALVIYA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241007",
    "name": "ANKUR UPADHYAY",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241008",
    "name": "ANUBHAV VARSHEKAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241009",
    "name": "ARUSHI UPADHYAY",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241010",
    "name": "ASTHA YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241011",
    "name": "AYUSH KARARE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241012",
    "name": "AYUSH KHANDERAO",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241013",
    "name": "AYUSH YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241014",
    "name": "BHUPENDRA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241015",
    "name": "BRAJESH PATEL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241016",
    "name": "DIVYA SINGH",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241017",
    "name": "DOLLY CHOUDHARY",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241018",
    "name": "DUSHYANT KUMAR DEV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241019",
    "name": "HARIOM CHHAPRE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241020",
    "name": "HARSH AGRAWAL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241021",
    "name": "HARSH KHANDELWAL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241022",
    "name": "HITESH MAHENDRA MAHAJAN",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241023",
    "name": "JAYESH VARULE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241024",
    "name": "KANISHK BOPCHE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241025",
    "name": "KRISHA TRIPATHI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241026",
    "name": "KRISHNA PRAJAPATI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241027",
    "name": "KULDEEP YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241028",
    "name": "KUNDAN DESHMUKH",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241029",
    "name": "KUSHAL VISHWAKARMA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241030",
    "name": "LAKSHYA SHARMA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241031",
    "name": "LAVKUSH PATEL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241032",
    "name": "MADHURA LANJEWAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241033",
    "name": "MAYANK SAHU",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241034",
    "name": "MOHAMMAD ZAID QURESHI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241035",
    "name": "NEHALIKA SINGH",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241036",
    "name": "NIKHILPATEL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241037",
    "name": "PAVAN RAIKWAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241038",
    "name": "PAWAN RAJAK",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241039",
    "name": "PIYUSH KUMAR CHOUHAN",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241040",
    "name": "PRAKHAR TRIVEDI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241041",
    "name": "PRAMOD KHARE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241042",
    "name": "PRANJAL SARAF",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241043",
    "name": "PRASHANSHA RICHHARIYA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241044",
    "name": "PRASHANT MANDELIYA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241045",
    "name": "PRASHANT SINGH",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241046",
    "name": "PRAYAG YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241047",
    "name": "PRIYANSHU KUMRAWAT",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241048",
    "name": "RAJ RAJAK",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241049",
    "name": "RAJIV PANDEY",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241050",
    "name": "RAVI SAHU",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241051",
    "name": "RISHAB NAIR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241052",
    "name": "RITESH YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241053",
    "name": "RUPESH PAWAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241054",
    "name": "SAMAGRA POTPHODE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241055",
    "name": "SAMEER SHUKLA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241056",
    "name": "SANKALP MALVIYA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241057",
    "name": "SANSKAR TIWARI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241058",
    "name": "SAPNA LONKAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241059",
    "name": "SARA MAKHIJA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241060",
    "name": "SARTHAK GODEWAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241061",
    "name": "SHALINI PAWAR",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241062",
    "name": "SHARAD YADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241063",
    "name": "SHIVAM TIWARI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241064",
    "name": "SHIVANSH TIWARI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241065",
    "name": "SHRADDHA SINGH",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241066",
    "name": "SHUBHAM JADAV",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241067",
    "name": "SHUBHAM NAGARGADE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241068",
    "name": "SUMIT VERMA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241069",
    "name": "TANVI VASULE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241070",
    "name": "TAPASYA BAIRAGI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241071",
    "name": "UTKARSH SHUKLA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241072",
    "name": "UTSAV ATRE",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241073",
    "name": "UTSAV DWIVEDI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241074",
    "name": "VAIBHAV PANDEY",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241075",
    "name": "VAISHNAVI ARYA",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241076",
    "name": "VIKRANT PATEL",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241077",
    "name": "YASH JAGET",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME241078",
    "name": "YUVRAJ RAI",
    "program": "B.Tech Mechanical Engineering",
    "programCode": "ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241001",
    "name": "ABHIJEET KUMAR TIWARI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241002",
    "name": "ALTAMASH KHAN",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241003",
    "name": "BHANU BOBADE",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241004",
    "name": "DEVENDRA SAHU",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241005",
    "name": "DHIRAJ KUMAR",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241006",
    "name": "DISHA SURYAWANSHI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241007",
    "name": "FARHAAN ALI AHMED",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241008",
    "name": "HARIS HUSAINI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241009",
    "name": "HARSH GUPTA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241010",
    "name": "HARSH TANWANI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241011",
    "name": "HARSHITA BHALE",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241012",
    "name": "HEMLATA LODHI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241013",
    "name": "HIMANSHI GHODE",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241014",
    "name": "JUHI PAWAR",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241015",
    "name": "PALASH PATIL",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241016",
    "name": "PREETI YADAV",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241017",
    "name": "RESHU CHOURASIYA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241018",
    "name": "RISHI PANDEY",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241019",
    "name": "SHIVANK MISHRA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241020",
    "name": "SHIVANSHU PANDEY",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241021",
    "name": "SMRITI DIKSHITA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241022",
    "name": "STUTI GOSWAMI",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241023",
    "name": "SURAJ BARMAN",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241024",
    "name": "TEENA YADAV",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241025",
    "name": "TRISHAY SHAKYA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241026",
    "name": "VINEET KUSHWAHA",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101PC241027",
    "name": "YASHSVI PANDEY",
    "program": "B.Tech Petrochemical Engineering",
    "programCode": "PC",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101AU243D01",
    "name": "ARYAN NAMDEO",
    "program": "B.Tech Lateral Automobile Engineering",
    "programCode": "AU",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101AU243D02",
    "name": "DIVYANSHA PRATAP SINGH",
    "program": "B.Tech Lateral Automobile Engineering",
    "programCode": "AU",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101AU243D03",
    "name": "SAPNA DEVI",
    "program": "B.Tech Lateral Automobile Engineering",
    "programCode": "AU",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101AU243D04",
    "name": "SONU SHARMA",
    "program": "B.Tech Lateral Automobile Engineering",
    "programCode": "AU",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D01",
    "name": "AKASH BANWASI",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D02",
    "name": "ANURAG",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D03",
    "name": "HEMRAJ TRIPATHI",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D04",
    "name": "KAVITA CHOUHAN",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D05",
    "name": "VINOD KUMAR VISHWAKARMA",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CE243D06",
    "name": "YOGESH KUMAR",
    "program": "B.Tech Lateral Civil Engineering",
    "programCode": "CE",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D01",
    "name": "ABHILASHA MUNDESIR",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D02",
    "name": "ANUSHKA PANDEY",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D03",
    "name": "DARSHAN MEERCHANDANI",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D04",
    "name": "DISHA VERMA",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D05",
    "name": "KRIPANK KUMBHARE",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D06",
    "name": "SANJEET KUMAR THAKUR",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D07",
    "name": "SARASWATI MISHRA",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D08",
    "name": "SHAMBHAVI BHARGAVA",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D09",
    "name": "SHASHANK SINGH RATHOUR",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D10",
    "name": "SUMIT",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D11",
    "name": "VIKASH",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS243D12",
    "name": "VISHAL PRAJAPATI",
    "program": "B.Tech Lateral Computer Science Engineering",
    "programCode": "CS",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D01",
    "name": "ARTI KUDAPE",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D02",
    "name": "DHRUV RAI",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D03",
    "name": "HARSH MALVIYA",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D04",
    "name": "KHUSHBU AHIRWAR",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D05",
    "name": "KHUSHI SINGH",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D06",
    "name": "KRISHNA KUMAR VISHWAKARMA",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D07",
    "name": "MOHINI",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D08",
    "name": "MOHIT KUMAR PANDEY",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D09",
    "name": "SIDDHARTH AHIRWAR",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D10",
    "name": "SUNIL KUMAR RAI",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D11",
    "name": "VINAY SINGH CHOUHAN",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EC243D12",
    "name": "VISHAL BAMNOTIYA",
    "program": "B.Tech Lateral Electronics & Communication Engineering",
    "programCode": "EC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D01",
    "name": "IRAM ZABIDA SHAMAS KHATANA",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D02",
    "name": "KIRAN",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D03",
    "name": "OM SINGH CHOUHAN",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D04",
    "name": "PIYUSH SAHU",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D05",
    "name": "PRANJALI MISHRA",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D06",
    "name": "RAVI KOL",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101EX243D07",
    "name": "YASH NAG",
    "program": "B.Tech Lateral Electrical & Electronics Engineering",
    "programCode": "EX",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D01",
    "name": "ADNAN KHAN",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D02",
    "name": "ANAND WAGHMARE",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D03",
    "name": "BHAVNA",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D04",
    "name": "DAYARAM",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D05",
    "name": "HIMANSHU PAHADE",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101IT243D06",
    "name": "SANIKA GAJBHIYE",
    "program": "B.Tech Lateral Information Technology",
    "programCode": "IT",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D01",
    "name": "FARHAN SHAKIL",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D02",
    "name": "KHILENDRA",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D03",
    "name": "MUNEEB SHAFI",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D04",
    "name": "OM PRAKASH",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D05",
    "name": "PIYUSH",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D06",
    "name": "PRADEEP THAKRE",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101ME243D07",
    "name": "SUNDARAM SINGH",
    "program": "B.Tech Lateral Mechanical Engineering",
    "programCode": "ME",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101PC243D01",
    "name": "AYUSH BANKHEDE",
    "program": "B.Tech Lateral Petrochemical Engineering",
    "programCode": "PC",
    "year": 2,
    "semester": 3,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME01",
    "name": "ABHILASHA SONI",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME02",
    "name": "ABHISHEK KUMAR PANDEY",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME03",
    "name": "ADARSH",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME04",
    "name": "ALOK SINGH",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME05",
    "name": "ANJALI CHAUDHARI",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME06",
    "name": "ARSHI SHAKEEL",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME07",
    "name": "DIVYANSH SINGH SAKET",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME08",
    "name": "KASHISH PAL",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME09",
    "name": "KUMARI SARITA",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME10",
    "name": "PARUL BHIMTE",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME11",
    "name": "REENA ATHNERE",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME12",
    "name": "SATISH UIKEY",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME13",
    "name": "SONAM PATEL",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME14",
    "name": "SUNITA SAINI",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME15",
    "name": "SUSHMITA NAG",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME16",
    "name": "TANU MANJHI",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME17",
    "name": "URMI BISWAS",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME18",
    "name": "VEERENDRA DEHARIYA",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME19",
    "name": "VIKASH",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CS24ME20",
    "name": "YUKTA SINGH NIMODA",
    "program": "M.E. Computer Science Engineering",
    "programCode": "CS-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME01",
    "name": "ABHIYANCHAL CHAURASIYA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME02",
    "name": "ARPIT MISHRA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME03",
    "name": "CHAITANYA KUMAR DEHARIYA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME04",
    "name": "DEEPAK",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME05",
    "name": "GOURI EVNE",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME06",
    "name": "KIRAN JAMRA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME07",
    "name": "LUCKY SHUKLA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME08",
    "name": "MAYANK SOLANKI",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME09",
    "name": "NAMAN THAKRE",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME10",
    "name": "NAMAN VERMA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME11",
    "name": "OM SEN",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME12",
    "name": "OMPRAKASH PATEL",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME13",
    "name": "PEEYUSH TIWARI",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME14",
    "name": "PRAGATI SAWARKAR",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME15",
    "name": "PURNIMA JAMRA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME16",
    "name": "RANJANA AHIRWAR",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME17",
    "name": "ROHIT PARMAR",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME18",
    "name": "SAMIKSHA CHOURASIA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME19",
    "name": "SANJEEV KUMAR SHUKLA",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME20",
    "name": "SHIVANI BAIRAGI",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME21",
    "name": "SWAPNIL WASKLE",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CE24ME22",
    "name": "VIKRAM SINGH DHAKAD",
    "program": "M.E. Structural Engineering",
    "programCode": "CE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME24ME01",
    "name": "MADHVENDRA SINGH TOMAR",
    "program": "M.E. Heat Power Engineering",
    "programCode": "ME-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101ME24ME02",
    "name": "PARTH SHARMA",
    "program": "M.E. Heat Power Engineering",
    "programCode": "ME-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EC24ME01",
    "name": "ASHVINI SOMKUWAR",
    "program": "M.E. Digital Communication Engineering",
    "programCode": "EC-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EC24ME02",
    "name": "SANJAY KUMAR EVANEY",
    "program": "M.E. Digital Communication Engineering",
    "programCode": "EC-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101EE24ME01",
    "name": "RAJ SONI",
    "program": "M.E. Power System Engineering",
    "programCode": "EE-ME",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241001",
    "name": "AARYA THAKRE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241002",
    "name": "ABHINAV KAUSHAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241003",
    "name": "ABHISHEK GORAYA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241004",
    "name": "AKASH SHENDE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241005",
    "name": "AKASH WASNIK",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241006",
    "name": "AMAN SINGH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241007",
    "name": "ANANT MISHRA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241008",
    "name": "ANKISH SINGH SENGAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241009",
    "name": "ANMOL SHARMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241010",
    "name": "ANUJ KUMAR MISHRA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241011",
    "name": "ANURADHA PATEL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241012",
    "name": "ANURAG SONI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241013",
    "name": "ARYAN RINAYAT",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241014",
    "name": "ASHUTOSH TIWARI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241015",
    "name": "BRAJMOHAN KALMODIYA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241016",
    "name": "DEEP SINGH RAJPUT",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241017",
    "name": "DEVANSHI MANKAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241018",
    "name": "DIVYANSHA TYAGI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241019",
    "name": "DRISHTI MENGHANI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241020",
    "name": "FALGUNI SON",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241021",
    "name": "FATIMA BANO",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241022",
    "name": "HARSH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241023",
    "name": "HARSH MAWLE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241024",
    "name": "HARSHIT PAWAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241025",
    "name": "HEMANG MALVIY",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241026",
    "name": "HIMANSHU JAISWAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241027",
    "name": "JAY DESHMUKH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241028",
    "name": "KASHISH RATHORE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241029",
    "name": "KOHIMA KSHIRSAGAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241030",
    "name": "KUNAL PUNJABI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241031",
    "name": "MAHAK BHARGAVA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241032",
    "name": "MAHAK VERMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241033",
    "name": "MANSHI SHRIVASTAV",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241034",
    "name": "MAYANK SHARMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241035",
    "name": "MONIKA VISHWAKARMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241036",
    "name": "NAMISHA RAWAT",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241037",
    "name": "NARAYAN SHUKLA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241038",
    "name": "NEHA KUMARI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241039",
    "name": "NIKITA YADAV",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241040",
    "name": "PALAK DANGI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241041",
    "name": "PRACHI DAHARWAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241042",
    "name": "PRIYANSHU DAVE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241043",
    "name": "PURVA RAMAWAT",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241044",
    "name": "RIYA DESHMUKH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241045",
    "name": "ROHIT",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241046",
    "name": "ROHIT KUSHWAH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241047",
    "name": "ROHIT PATEL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241048",
    "name": "SAMRIDHI MISHRA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241049",
    "name": "SANIYA KHAN",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241050",
    "name": "SANJANA LODHWAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241051",
    "name": "SANJANA MEENA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241052",
    "name": "SHASHWAT SINGH NAMDEO",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241053",
    "name": "SHRADDHA WANKHADE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241054",
    "name": "SHREYA MANDALE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241055",
    "name": "SHRUTI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241056",
    "name": "SHUBHAM CHOUDHARY",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241057",
    "name": "SHUBHAM SHARMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241058",
    "name": "SHUBHAM SONI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241059",
    "name": "SHWETA KAURAV",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241060",
    "name": "STUTI MISHRA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241061",
    "name": "SUDHANSHU SHARMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241062",
    "name": "SUHANI BARASKAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241063",
    "name": "SUJEET P SINGH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241064",
    "name": "SYED ADAM KHALID",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241065",
    "name": "TANUSH KUMAR KEMA",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241066",
    "name": "UPHAR JAISWAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241067",
    "name": "VAISHALEE",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241068",
    "name": "VANSH SONI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241069",
    "name": "VIBHUTI PRAJAPATI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241070",
    "name": "VIKAS AHIRWAR",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241071",
    "name": "VINAY CHANDRAVANSHI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241072",
    "name": "VISHAL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241073",
    "name": "VISHAL PATEL",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241074",
    "name": "VISHAL PRAJAPATI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241075",
    "name": "VISHAL SONI",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241076",
    "name": "YAGYA PRATAP SINGH",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  },
  {
    "enrollmentNo": "0101CA241077",
    "name": "YOGENDRA CHOUDHARY",
    "program": "MCA",
    "programCode": "CA",
    "year": 1,
    "semester": 1,
    "section": null
  }
]; 
    
    // Inserts all 3 objects at once into the collection
    const result = await User.insertMany(usersArray); 
    
    console.log(`${result.length} users saved successfully!`);
    return result;
  } catch (error) {
    console.error('Error saving batch users:', error);
    throw error;
  }
}

saveBatchUsers().then((result)=>console.log(result));
