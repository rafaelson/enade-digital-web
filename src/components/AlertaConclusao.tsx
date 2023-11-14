import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
//import DialogTitle from "@mui/material/DialogTitle";
import AlertaConclusaoProps from "../interfaces/AlertaConclusaoProps";

export default function AlertaConclusao(props: AlertaConclusaoProps) {
  return (
    <>
      <Dialog
        open={props.alertaConclusao}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja finalizar a prova?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={() => props.handleClose(false)}>Não</Button>
          <Button onClick={() => props.handleClose(true)} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
