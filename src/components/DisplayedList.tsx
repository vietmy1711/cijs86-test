import React from 'react'
import { TodoItem } from '../App';
import DisplayedItem from './DisplayedItem';

export type DisplayedListProps = {
    updateList: () => void
    children: Array<TodoItem>
}
  

const DisplayedList = (props: DisplayedListProps) => {
  return (
    <div className='list'>
        {props.children.map((e, i) => {
            return <DisplayedItem updateList={props.updateList} key={i.toString()}>{e}</DisplayedItem>
        })}
    </div>
  )
}

export default DisplayedList;