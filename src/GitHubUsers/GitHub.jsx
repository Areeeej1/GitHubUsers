import "./GitHub.css"
import React ,{useState,useEffect}from 'react';
import MUIDataTable from "mui-datatables";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";

export const getMuiTheme = () => createTheme({

  palette: {
    mode: 'dark',
    primary: { main: '#7986cb', contrastText: '#212121' }
  },
  components: {
    MUIDataTableHeadCell: {
      styleOverrides:{
        root: {
            textAlign:"center",
          
        }
      }
    },
    MUIDataTablePagination: {
      styleOverrides:{
        tableCellContainer: {
          padding:"0px 0px 0px 0px"
        },
          
        }
      }
    }
  
  
})
const GitHub=()=> {
    const [users,setUsers]=useState();
    const [error,setError]=useState();
    const [loading,setLoading]=useState(true);
    const getData=()=>{
     axios.get("https://api.github.com/users")
     .then(res=>{
      
        setUsers(res.data);
        setLoading(false);
     })
     .catch((error)=>{
      setLoading(false);
      setError(error.message);
     })

   
    }
    useEffect(()=>{
        getData();
    },[])
  

    const columns = [{name:"login",
                      label: "Name",
                      style:{
                       textAlign:"center"
                      },
                      options: {
                        filter: false,
                        sort: false,
                        
                       }
                       
                    
                    }, 

                      {name:"avatar_url",
                      label:"Picture",
                      options: {
                        filter: false,
                        sort: false,
                       }},
                     
                    ];



    const options = {
       textLabels: {
       
    body: {
      
     
      noMatch: "Sorry, no matching records found",
    },
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows Per Page",
      displayRows: "of"
      
    }
  },
    selectableRowsHideCheckboxes:true,
    download: false,
    print: false,
    MuiTablePagination:false,
   viewColumns:false,
    filter:"false",
    searchPlaceholder:"Search By User Name",
        selectableRows: "none",
        
      
        customRowRender: (data,rowIndex) => {
           
          const [login, avatar_url] = data;
          return (
         
           <TableRow key={rowIndex}>
      <TableCell style={{textAlign:'center'}} >{login}</TableCell>
      <TableCell style={{textAlign:'center'}} ><img style={{width:"40px" ,height:"40px"}}src={avatar_url} alt="logo"></img></TableCell>
    </TableRow>
         
          );
        }
     

    };
    

    return (
        <>
        { loading ?  <Box sx={{ width: '100%' }}><LinearProgress style={{marginTop:"10px", color:"rgb(97, 231, 137)"}}/></Box> : 
        <>
        { error ? <p style={{color:"red",fontSize:"100%",paddingLeft: "40%"}}>{error} </p>: 
        
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
        title={"GitHub Users"}
        data={users}
        columns={columns}
        options={options}>
        </MUIDataTable>
        </ThemeProvider>
       }
         </>
         }
        </>
    );
}

export default GitHub;