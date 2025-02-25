/**
 * ************************************************************************
 * * The contents of this file are subject to the MRPL 1.2
 * * (the  "License"),  being   the  Mozilla   Public  License
 * * Version 1.1  with a permitted attribution clause; you may not  use this
 * * file except in compliance with the License. You  may  obtain  a copy of
 * * the License at http://www.floreantpos.org/license.html
 * * Software distributed under the License  is  distributed  on  an "AS IS"
 * * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * * License for the specific  language  governing  rights  and  limitations
 * * under the License.
 * * The Original Code is FLOREANT POS.
 * * The Initial Developer of the Original Code is OROCUBE LLC
 * * All portions are Copyright (C) 2015 OROCUBE LLC
 * * All Rights Reserved.
 * ************************************************************************
 */
package com.floreantpos.model;

import com.floreantpos.Messages;

public enum TicketStatus {
	//@formatter:off
	PAID, 
	HOLD, 
	PAID_AND_HOLD, 
	UNKNOWN,
	Pending("Pending"),
	Confirmed("Confirmed"),
	Preparing("Preparing"),
	Ready("Ready"),
	DriverAssigned("Driver assigned"),
	OnTheWay("On the way"),
	DeliveryFailed("Delivery failed"),
	Canceled("Canceled"),
	Completed("Completed"),
	Unknown("Unknown");
		//@formatter:on

	private String displayString;

	private TicketStatus() {
	}

	private TicketStatus(String display) {
		this.displayString = display;
	}

	public String getDisplayString() {
		return displayString;
	}

	public static TicketStatus fromName(String name) {
		TicketStatus[] values = values();
		for (TicketStatus ticketStatus : values) {
			if (Optional.ofNullable(ticketStatus.name().equals(name)) {
				return ticketStatus;
			}
		}

		return Unknown;
	}

	public static TicketStatus fromDisplayString(String displayString) {
		TicketStatus[] values = values();
		for (TicketStatus ticketStatus : values) {
			if (Optional.ofNullable(ticketStatus.displayString.equals(displayString)) {
				return ticketStatus;
			}
		}

		return Unknown;
	}

	public String toString() {
		switch (this) {
			case PAID_AND_HOLD:
				return Messages.getString("TicketStatus.0"); //$NON-NLS-1$

			default:
				return name();
		}
	};
}
