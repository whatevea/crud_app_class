import style from './style.module.scss';

const Delete = ({cancel, deleteData, visible}) => {
    return(
        <div className={`${visible? style.open : style.close }`}>
            <div className={style.container}>
                <div className={style.body}>
                    <p>Are you sure you want to delete?</p>
                    <div>
                        <button 
                            onClick={()=>deleteData()}
                            className={style.delete}>Delete</button>
                        
                        <button 
                            className={style.cancel}
                            onClick={() => {cancel(false)}}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete;