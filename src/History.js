import React, {useState, useEffect} from "react";


export default function History(props) {

  const [lapHistory, setLapHistory] = useState([new Map()]);
  const [currentLapTime, setCurrentLapTime] = useState(0);
  const [prevLapTime, setPrevLapTime] = useState(0);
  const [lapCount, setLapCount] = useState(0);
  const [tableData, setTableData] = useState();


  useEffect(() => {
    if(!props.isStopwatchReset) {
      setCurrentLapTime(props.currentTime - props.lapTime);
      setLapHistory(lapHistory.set(lapCount,currentLapTime));
    }
  }, [props.currentTime]);

  useEffect(() => {
    if(props.isStopwatchReset) {
      setLapHistory(new Map());
      setCurrentLapTime(0);
      setPrevLapTime(0);
      setLapCount(0);
    }
  },[props.isStopwatchReset]);

  useEffect(() => {
    setPrevLapTime(currentLapTime);
    setLapCount(lapCount + 1);
  }, [props.lapTime]);


  useEffect(() => {
     const historyArray = Array.from(lapHistory);
     let newTableData = historyArray.map((lapTime,lapNumber) => {
       return (
         <tr>
           <td>{lapNumber}</td>
           <td>{lapTime}</td>
         </tr>
       );
     });
    setTableData(newTableData);
  }, [currentLapTime]);



  return (
    <div>
      hi
      <table id='lapTable'>
        <tbody>
          {tableData}
        </tbody>
      </table>
    </div>
  )

}
