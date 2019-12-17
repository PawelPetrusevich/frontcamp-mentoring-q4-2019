export default function getSelectedItem(dropdownName){
    var dropdown = document.getElementById(dropdownName);
    var selectedItem = dropdown.options[dropdown.selectedIndex].value;
    return selectedItem;
}