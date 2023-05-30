import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { crudSelector, deleteData } from '../../redux/reducers/crudSlice'
import Delete from '../commons/delete'
import style from './style.module.scss'

const Home = () => {
    const selector = useSelector(crudSelector)
    const dispatch = useDispatch()

    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteId] = useState(null)

    const handleDelete = (id) => {
        setShowDelete(true);
        setDeleteId(id)
    }

    const deleteItem = () => {
        dispatch(deleteData(deleteID))
    }
    return (
        <div className={style.container}>
            <table className={style.tableName}>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Dob</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selector?.map((item, key)=>{
                            return (
                                <tr key={key}>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.country}</td>
                                    <td>{item.dob}</td>
                                    <td>
                                        <button><Link to={`/${item.id}/edit`}>Edit</Link></button>
                                        <button className={style.delete} onClick={()=> {handleDelete(item.id)}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {   
                showDelete && (
                    <Delete cancel={(e)=>setShowDelete(e)} deleteData={()=>deleteItem()} visible={showDelete}/>
                )
            }
            
        </div>
    )
}

export default Home
