const DashboardAdmin = () => {
  // const [examList, setExamList] = useState<any[]>([]);

  // const callApiQsList = async () => {
  //   try{
  //     const url = process.env.REACT_APP_API_URL + 'exams/fetchallexams';

  //     const response  = await axios.get(url);
  //     console.log(response);
  //     setExamList(response.data);
  //   }
  //   catch(error){
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   callApiQsList();
  // }, [])

  // const startExam = () => {

  // }

  return (
    <>
      {/* <table className='table table-striped'>
            <thead>
            <tr>
              <th>Sr No</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th>-</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {
              examList && examList.map((item, index) => (
                
                <tr>
                  <td>{index}</td>
                  <td>{item.exam_name}</td>
                  <td>{item.duration}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.subject_id}</td>
                  <td>
                    <button onClick={startExam} className='btn btn-primary'>Start Exam</button>
                  </td>
                </tr>
              ))
            }
            </tbody>
          </table> */}
    </>
  );
};

export default DashboardAdmin;
