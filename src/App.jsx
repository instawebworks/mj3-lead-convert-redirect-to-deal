import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";
const ZOHO = window.ZOHO;

function App() {
    useEffect(() => {
        ZOHO.embeddedApp.on("PageLoad", function (data) {
            console.log(data);
            const entity = data.Entity;
            const entityId = data.EntityId;
            /**
             * Convert Lead
             */
            let request = {
                url: `https://www.zohoapis.com/crm/v2/functions/bcrm_convert_lead_from_widget/actions/execute?auth_type=apikey&zapikey=1003.6bcce2b1bc610235dc15304af47808c9.a6daa398db38f2535e53970810d71869&lead_id=${entityId}`,
            };
            ZOHO.CRM.HTTP.get(request).then(async function (data) {
                console.log({ data });
                const dealId = JSON.parse(data)?.Deal_ID;
                if (dealId) {
                    await ZOHO.CRM.BLUEPRINT.proceed();
                    window.open(
                        `https://crm.zoho.com/crm/org37143442/tab/Potentials/${dealId}`,
                        "_top"
                    );
                } else {
                    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
                        console.log(data);
                    });
                }
            });
        });

        /*
         * initializing the widget.
         */
        ZOHO.embeddedApp.init();
    }, []);

    return (
        <>
            <h2>
                Lead is converting and redirecting to Deal. Please wait......
            </h2>
            {/* <button
                onClick={() => {
                    ZOHO.CRM.UI.Popup.closeReload().then(function (data) {
                        console.log(data);
                    });
                }}>
                Cancel
            </button> */}
        </>
    );
}

export default App;
