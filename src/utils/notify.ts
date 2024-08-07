import { enqueueSnackbar, SnackbarKey } from 'notistack';

type Variant = 'error' | 'success' | 'warning' | 'info';

export const notify = (message: string, variant: Variant, direction?: "right"): SnackbarKey => {
	return enqueueSnackbar(message, {
		variant: variant,
		autoHideDuration: 2000,
		anchorOrigin: { vertical: 'top', horizontal: direction ? direction : 'center' },
		style: {fontSize:"16px"}, 
	});
};