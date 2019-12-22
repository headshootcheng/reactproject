function EditIcon(){
    this.setState({icon:'normal'})
}
function SelectIcon(){
    document.getElementById('files').click();
}
module.exports={EditIcon,SelectIcon}