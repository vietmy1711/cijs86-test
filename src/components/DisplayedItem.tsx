import { Status, TodoItem } from '../App';
import { Button, Checkbox } from '@mui/material';
import './DisplayedItem.css'

export type DisplayedItemProps = {
    children: TodoItem
    updateList: () => void
}

const DisplayedList = (props: DisplayedItemProps) => {

    return (
        <div className='item-container'>
            <Checkbox checked={props.children.isChecked} className='checkbox' onChange={(_, checked) => {
                props.children.isChecked = checked;
                props.updateList();
            }}></Checkbox>
            <p className={props.children.status === Status.Completed ? 'done' : ''}>{props.children.name}</p>
            {
                props.children.status !== Status.Completed &&
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                <Button onClick={_ => {
                    props.children.status = Status.Completed;
                    props.updateList();
                }}>Done</Button>
    
            }
        </div>
    )
}

export default DisplayedList;