export default function emitEvent(input) {
    let event;
    if (input) {
        switch(Number(input)) {
          case 1:
            event = "place_order";
            break;
          case 2:
            event = "cont_inue";
            break;
          case 12:
          case 14:
          case 16:
          case 22:
          case 24:
          case 26:
          case 32:
          case 34:
          case 36:
          case 42:
          case 44:
          case 46:
            event = "option_selected";
            break;
          case 99:
            event = "checkout_order";
            break;
          case 98:
            event = "order_history";
            break;
          case 97:
            event = "current_order";
            break;
          case 0:
            event = "cancel_order";
            break;
          case 10:
            event = "grilled_options";
            break;
          case 20:
            event = "peppersoup_options";
            break;
          case 30:
            event = "sides_options";
            break;
          case 40:
            event = "beverage_options";
            break;
          default:
            event = 'input_error';
        }
      } 
    return event
}

