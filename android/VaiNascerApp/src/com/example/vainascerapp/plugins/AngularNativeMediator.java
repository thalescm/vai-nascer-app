package com.example.vainascerapp.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.DroidGap;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.NetworkInfo;
import android.net.Uri;
import android.util.Log;
import android.webkit.WebSettings.PluginState;
import com.example.vainascerapp.MainActivity;

@SuppressWarnings("unused")
public class AngularNativeMediator extends CordovaPlugin {

	private static final int RESULT_OK = 0;
	private static final String TAG = "AngularNativeMediator";

	@Override
	public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {

		try {
			
			if (action.equals("openUrl")) {
				
				String[] mediatorArgs = args.getString(0).split(",");

				Intent intent = new Intent();
				int requestCode = RESULT_OK;
				
				for (int i = 0; i < mediatorArgs.length; i++) {
					try {
						intent = new Intent(Intent.ACTION_VIEW, Uri.parse(mediatorArgs[i].trim()));
						cordova.getActivity().startActivityForResult(intent, requestCode);
						if (requestCode == RESULT_OK) {
							break;							
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				
				return true;

			}

			return false;			

		} catch (Exception e) {
		
			callbackContext.error("Could execute plugin");
			return false;

		}
	
	}
	
}
