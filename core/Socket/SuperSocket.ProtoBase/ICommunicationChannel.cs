﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//using System.Threading.Tasks;

namespace SuperSocket.ProtoBase
{
    /// <summary>
    /// The interface for communication channel
    /// </summary>
    public interface ICommunicationChannel
    {
        /// <summary>
        /// Send the binary segment to the other endpoint through this communication channel
        /// </summary>
        /// <param name="segment">the data segment to be sent</param>
        void Send(ArraySegment<byte> segment);

        /// <summary>
        /// Close the communication channel
        /// </summary>
        void Close();
    }
}
