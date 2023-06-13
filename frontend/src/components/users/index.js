import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { crudSelector, deleteData } from '../../redux/reducers/crudSlice'
import Delete from '../commons/delete'
import style from './style.module.scss'
import http from '../../config'
import Swal from "sweetalert2"
const Users = () => {
    // const selector = useSelector(crudSelector)
    // const dispatch = useDispatch()
    const getUsers = () => {
        http.get("/users").then(
            data => {
                let usersList = data.data.data
                setUsers(usersList)

            }
        )
    }
    const [users, setUsers] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteId] = useState(null)
    useEffect(() => {
        getUsers()
    }, [])
    //data fetching method


    const handleDelete = (id) => {
        setShowDelete(true);
        setDeleteId(id)
    }

    const deleteItem = () => {
        http.delete("/user", { data: { id: deleteID } }).then(data => {
            getUsers()
            setShowDelete(false)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Deleted Successfully',
                showConfirmButton: false,
                timer: 1500
            })

        })
    }
    return (
        <div className={style.container}>
            <table className={style.tableName}>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>MakeChanges</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.fname}</td>
                                    <td>{item.lname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <button><Link to={`/${item.id}/edit`}>Edit</Link></button>
                                        <button className={style.delete} onClick={() => { handleDelete(item._id) }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                showDelete && (
                    <Delete cancel={(e) => setShowDelete(e)} deleteData={() => deleteItem()} visible={showDelete} />
                )
            }

        </div>
    )
}

export default Users
