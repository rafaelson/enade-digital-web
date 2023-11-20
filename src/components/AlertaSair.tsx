import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AlertaSairProps from "../interfaces/AlertaSairProps";

export default function AlertaSair(props: AlertaSairProps) {
  return (
    <>
      <Dialog
        open={props.alertaSair}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja sair?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={() => props.handleClose(false)}>Não</Button>
          <Button onClick={() => props.handleClose(true)}>Sim</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
