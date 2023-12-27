import MaterialTable from "@material-table/core"
import { Grid } from '@mui/material';
import Navbar from '../component/Navbar';
import { getData } from "../services/FetchNodeService";
import { useState , useEffect } from "react";

export const Home = () => {
  // var token = localStorage.getItem("TOKEN");
  const [data , setData] = useState([]);

  const fetchAllServey = async () =>{
    var result = await getData("survey/all-surveys");
     setData(result.surveys)
  }



 useEffect(function(){
   fetchAllServey()
 } ,[])


  return (
    <>
      <Navbar />
      <Grid
        container
        spacing={2}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          padding:5
        }}
      >
        <Grid item xs={12}>
         
          <MaterialTable
            title=" Previous Survey"
            columns={[
              { title: 'Name', field: 'name' },
              {title:'Gender' , field:'gender'},
              {title:'Nationality' , field:'nationality'},
              {title:'Email' , field:'email'},
              {title:'Phone Number' , field:'phone'},
              {title:'Address' , field:'address'},
              {title:'Message' , field:'message'},
            ]}
            data={data}
           
          />
        </Grid>
      </Grid>
    </>
  );
};
