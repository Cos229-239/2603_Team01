</> Kotlin

package com.example.devreflect

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            DevReflectUI()
        }
    }
}
@Composable
fun DevReflectUI() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("DevReflect", fontSize = 24.sp)

        Text("How's the code going?", fontSize = 20.sp)

        Spacer(modifier = Modifier.height(10.dp))

        //Mood Row
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier.fillMaxWidth()
        ) {

            Text("😤", fontSize = 28.sp)
            Text("😕", fontSize = 28.sp)
            Text("😐", fontSize = 28.sp)
            Text("😄", fontSize = 28.sp)
            Text("😍", fontSize = 28.sp)
        }

        Spacer(modifier = Modifier.height(20.dp))

        //Reflection Box
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .height(200.dp)
                .background(MaterialTheme.colorScheme.surfaceVariant),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text("🦆", fontSize = 40.sp)

            Text("No reflections yet")
            Text("Start logging your first thought", fontSize = 12.sp)

            Button(onClick = { }) {
                Text("+ New Reflection")
            }

        }

        Spacer(modifier = Modifier.height(20.dp))

        //Buttons Row 1
        Row(modifier = Modifier.fillMaxWidth()) {
            Button(
                onClick = {},
                modifier = Modifier.weight(1f)
            ) {
                Text("🐞 Log a bug")
            }

            Spacer(modifier = Modifier.width(10.dp))

            Button(
                onClick = {},
                modifier = Modifier.weight(1f)
            ) {
                Text("🦆 Duck mode")
            }
        }
        Spacer(modifier = Modifier.height(10.dp))

        //Buttons Row 2
        Row(modifier = Modifier.fillMaxWidth()) {
            Button(
                onClick = {},
                modifier = Modifier.weight(1f)
            ) {
                Text("🌙 End of day")
            }

            Spacer(modifier = Modifier.width(10.dp))

            Button(
                onClick = {},
                modifier = Modifier.width(1f)
            ) {
                Text("💡 Quick idea")
            }
        }
    }

}
// Testing completed
=======
}
