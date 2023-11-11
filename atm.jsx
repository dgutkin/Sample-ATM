
const ATMDeposit = ({ onChange, isDeposit }) => {

  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h5> {choice[Number(!isDeposit)]}</h5>
      <input type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit"></input>
    </label>
  );

};

const Account = () => {

  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Your account balance is $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
      return;
    }
    setDeposit(Number(event.target.value));
    !isDeposit && (Number(event.target.value) > totalState) ? setValidTransaction(false) : setValidTransaction(true);
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    if (newTotal < 0) {
      alert('Insufficient Funds');
      newTotal += deposit
    }
    setTotalState(newTotal);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value)
    event.target.value == "Deposit" ? setIsDeposit(true) : setIsDeposit(false)
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 id="total">{status}</h2>
      <label>What would you like to do?</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {
        atmMode != "" && <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
      }
      
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
