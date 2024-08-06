import { Input } from "antd"
interface inputProps{
    label:string
    type:string

}
const InputComponent:React.FC<inputProps> = ({label,type}) => {
  return (
    <>
    <Input type={type} addonBefore={label}/>
    </>
  )
}

export default InputComponent