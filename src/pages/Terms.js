import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(10),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }} onClick={handleClickOpen}>
        Terms and Conditions and Privacy Policy
      </div>
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialog}
          style={{ paddingRight: "80px" }}
        >
          Enactus - FallFest
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <b>Privacy policy </b> <br /> None of the details filled by the
            users shall be shared with a third party, the information shall
            remain between the admin. <br />
            <b>Term & Conditions </b> <br /> The event shall be organised on
            October 14, 2022. Their shall be no refunds and the event shall
            encompass a variety of coupons as listed in the tickets, the coupons
            can be used to play games and avail other such services.
            <br />
            <b>Product & Pricing </b> <br /> Tickets for the event shall be sold
            and the tickets will be shared down below with their prices <br />{" "}
            Standard - ₹100 <br />
            Premium - ₹150 <br />
            Elite - ₹250 <br />
            <b>Shipping Policy </b> <br /> The tickets shall be directly handed
            over to the buyers on the day of the event by the admins of the
            website, such is the contract between the parties.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
