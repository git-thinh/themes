using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace app
{
    public partial class Default : System.Web.UI.Page
    {

        // ManualResetEvent instances signal completion.
        private static ManualResetEvent connectDone = new ManualResetEvent(false);
        private static void ConnectCallback(IAsyncResult ar)
        {
            try
            {
                // Retrieve the socket from the state object.
                Socket client = (Socket)ar.AsyncState;

                // Complete the connection.
                client.EndConnect(ar);

                //Console.WriteLine("Socket connected to {0}", client.RemoteEndPoint.ToString());

                // Signal that the connection has been made.
                connectDone.Set();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        public static void Send(IPEndPoint ipEndPoint, string data)
        {
            new Thread(new ThreadStart(() =>
            {

                using (Socket c = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp))
                {
                    c.BeginConnect(ipEndPoint, new AsyncCallback(ConnectCallback), c);
                    connectDone.WaitOne();

                    string key = DateTime.Now.ToString("yyMMddHHmmssfff");
                    string guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
                    SHA1 sha = new SHA1CryptoServiceProvider();
                    byte[] hash = sha.ComputeHash(Encoding.ASCII.GetBytes(key + guid));
                    string _Sec_WebSocket_Key = Convert.ToBase64String(hash);

                    //string data = Guid.NewGuid().ToString();
                    var bytes = Encoding.UTF8.GetBytes(data);
                    var base64 = Convert.ToBase64String(bytes);

                    //var handshake = "GET / HTTP/1.1\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Version: 13\r\nSec-WebSocket-Key: p2z/MFplfpRzjsVywqRQTg==\r\nHost: echo.websocket.org\r\nOrigin: http://echo.websocket.org/\r\n\r\n";
                    var handshake = "GET / HTTP/1.1\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Version: 13\r\nSec-WebSocket-Key: " + _Sec_WebSocket_Key + "\r\nHost: localhost\r\nOrigin: " + base64 + "\r\n\r\n";
                    var byteData = Encoding.UTF8.GetBytes(handshake);

                    c.Send(byteData, SocketFlags.Partial);

                    c.Shutdown(SocketShutdown.Both);
                    c.Close();
                }

            })).Start();

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            //Send(Global.ipEndPoint, DateTime.Now.ToString());
        }
    }
}