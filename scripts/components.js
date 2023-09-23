const Header = {
  render: (customClass = "") => {
    return `
     
      <h1 class="header ${customClass}" id="header">
      Easy groceries
      </h1>

     
    `;
  }
};
const Blocks = {
  render: (customClass = "") => {
    return `<div class="blocks ${customClass}" ><p class="btnEnterContainer">
    <a class="btnEnterMain" id="btnEnterMain" title="Личный кабинет" href="#account"></a>
    </p>
    <p class="btnExitContainer">
    <a class="btnExit" id="btnExit" title="Выйти" href="#registration"></a>
    </p></div>`;
  }
};
const Gif = {
  render: (customClass = "") => {
    return `<div class="gif ${customClass}"></div>`;
  }
};


const Content = {
  render: (customClass = "") => {
    return `<div class="content ${customClass}" id="content"></div>`;
  }
};




