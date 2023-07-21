/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global global, Office, self, window */

Office.onReady(() => {
  // If needed, Office.js is ready to be called
  const buttonId = 'TaskpaneButton1';

  // Get a reference to the button control
  const button = Office.ribbon.requestButton({
    id: buttonId
  });

  // Add event handlers for mouseover and mouseout events
  button.addEventListener('click', handleMouseOver);
  button.addEventListener('mouseout', handleMouseOver);

  console.log('fired')

  // Mouseover event handler
  function handleMouseOver(event) {
    // Apply the hover effect by updating the button's state
    console.log('over over')
    button.requestUpdate({
      id: buttonId,
      properties: {
        enabled: true,
        buttonState: 'Pressed'
      }
    });
  }

  // Mouseout event handler
  function handleMouseOut(event) {
    // Remove the hover effect by updating the button's state
    button.requestUpdate({
      id: buttonId,
      properties: {
        enabled: false,
        buttonState: 'Normal'
      }
    });
  }
});

/**
 * Shows a notification when the add-in command is executed.
 * @param event {Office.AddinCommands.Event}
 */
function action(event) {
  const message = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message
  Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);

  // Be sure to indicate when the add-in command function is complete
  event.completed();
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal();

// The add-in command functions need to be available in global scope
g.action = action;
